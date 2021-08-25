import ts from 'typescript'
import state from '../../state'

function insert<T extends ts.Node>(nodexx: ts.NodeArray<T>, node: T, at?: T) {
    const list = Array.from(nodexx.values())
    if (at === undefined) {
        list.push(node)
    } else {
        const index = nodexx.indexOf(at)
        list.splice(index, 0, node)
    }
    return ts.factory.createNodeArray(list)
}

function insertMany<T extends ts.Node>(
    nodexx: ts.NodeArray<T>,
    nnn: T[],
    at?: T,
) {
    const list = Array.from(nodexx.values())
    if (at === undefined) {
        list.push(...nnn)
    } else {
        const index = nodexx.indexOf(at)
        list.splice(index, 0, ...nnn)
    }
    return ts.factory.createNodeArray(list)
}

function replace(from: ts.Node, to: ts.Node | undefined) {
    run((context) => {
        const visitor = (node: ts.Node): any => {
            if (Object.is(node, from)) {
                return to
            }
            return ts.visitEachChild(node, visitor, context)
        }
        return visitor
    })
}

function run(transformer: ts.TransformerFactory<ts.Node>) {
    const result = ts.transform(state.sf, [transformer])
    result.diagnostics?.forEach((diagnostic) => {
        console.error(diagnostic.messageText)
    })
    const printer = ts.createPrinter()
    result.transformed.forEach((file) => {
        const sf = file as ts.SourceFile
        const text = printer.printFile(sf)
        // console.log(text)
        state.worker.lsh.writeFile(sf.fileName, text)
    })
    state.worker.checkDiagnostic(state.file)
}

function setProperty(
    parent: ts.Node,
    to: ts.Node | ts.NodeArray<ts.Node>,
    propertyName: string,
) {
    console.log(propertyName)
    run((context) => {
        const visitor = (node: ts.Node): ts.Node => {
            if (Object.is(node, parent)) {
                const clone = ts.getMutableClone(parent) as any
                clone[propertyName] = to
                return clone
            }
            return ts.visitEachChild(node, visitor, context)
        }
        return visitor
    })
}

function transform(
    node: ts.Node,
    parent: ts.Node,
    propertyName: string,
    old?: ts.Node,
) {
    if (old === undefined) {
        setProperty(parent, node, propertyName)
        return
    }

    replace(old, node)
}

const Transformer = {
    insert,
    insertMany,
    replace,
    run,
    setProperty,
    transform,
}

export default Transformer

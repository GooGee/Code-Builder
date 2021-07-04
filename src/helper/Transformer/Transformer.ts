import ts from 'typescript'
import state from '../../state'

function insert<T extends ts.Node>(nodexx: ts.NodeArray<T>, item: T, at?: T) {
    const list = Array.from(nodexx.values())
    if (at === undefined) {
        list.push(item)
    } else {
        const index = nodexx.indexOf(at)
        list.splice(index, 0, item)
    }
    return ts.factory.createNodeArray(list)
}

function remove<T extends ts.Node>(nodexx: ts.NodeArray<T>, item: T) {
    const index = nodexx.indexOf(item)
    const list = Array.from(nodexx.values())
    list.splice(index, 1)
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
        console.log(diagnostic.messageText)
    })
    const printer = ts.createPrinter()
    result.transformed.forEach((file) => {
        const sf = file as ts.SourceFile
        const text = printer.printFile(sf)
        // console.log(text)
        state.worker.lsh.writeFile(sf.fileName, text)
    })
}

function set(parent: ts.Node, to: ts.Node, propertyName: string) {
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
    nnn: ts.Node,
    parent: ts.Node,
    propertyName: string,
    old?: ts.Node,
) {
    if (old === undefined) {
        set(parent, nnn, propertyName)
        return
    }

    replace(old, nnn)
}

const Transformer = {
    insert,
    remove,
    replace,
    run,
    transform,
}

export default Transformer

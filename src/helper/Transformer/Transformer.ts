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

function makeTransformer(from: ts.Node, to: ts.Node) {
    return (context: ts.TransformationContext) => {
        const visitor = (node: ts.Node): ts.Node => {
            if (Object.is(node, from)) {
                return to
            }
            return ts.visitEachChild(node, visitor, context)
        }
        return visitor
    }
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
        console.log(text)
        state.worker.lsh.writeFile(sf.fileName, text)
    })
}

function transform(from: ts.Node, to: ts.Node) {
    run(makeTransformer(from, to))
}

export default {
    insert,
    makeTransformer,
    run,
    transform,
}

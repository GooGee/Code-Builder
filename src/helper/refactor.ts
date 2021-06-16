import ts from 'typescript'
import state from '../state'
import Transformer from './Transformer/Transformer'

function replace(
    from: ts.Identifier | ts.PrivateIdentifier,
    to: ts.Identifier | ts.PrivateIdentifier,
) {
    const symbol = state.worker.checker.getSymbol(from)
    if (symbol === undefined) {
        throw new Error('Symbol undefined')
    }

    Transformer.run((context) => {
        const visitor = (node: ts.Node): ts.Node => {
            if (ts.isIdentifierOrPrivateIdentifier(node)) {
                const sss = state.worker.checker.getSymbol(node)
                if (Object.is(symbol, sss)) {
                    return to
                }
            }
            return ts.visitEachChild(node, visitor, context)
        }
        return visitor
    })
}

export default function refactor(
    node: ts.Identifier | ts.PrivateIdentifier,
    text: string,
) {
    const name = text.trim()
    if (node.text === name) {
        return
    }
    if (text.match(/^[a-zA-Z_][a-zA-Z_0-9]*$/) === null) {
        throw new Error('Invalid name')
    }

    // todo check if name exists

    replace(node, ts.factory.createIdentifier(text))
}

import ts from 'typescript'
import Transformer from './Transformer'

export function replaceLiteral(
    node: ts.StringLiteral | ts.NumericLiteral,
    text: string,
) {
    if (ts.isNumericLiteral(node)) {
        const item = ts.factory.createNumericLiteral(text)
        Transformer.replace(node, item)
        return
    }

    if (ts.isStringLiteral(node)) {
        const item = ts.factory.createStringLiteral(text)
        Transformer.replace(node, item)
        return
    }
}

import ts from 'typescript'
import Transformer from './Transformer'

function addArgument(parent: ts.CallExpression | ts.NewExpression) {
    const list = Transformer.insert(
        parent.arguments!,
        ts.factory.createIdentifier('undefined'),
    )
    if (ts.isCallExpression(parent)) {
        const node = ts.factory.updateCallExpression(
            parent,
            parent.expression,
            parent.typeArguments,
            list,
        )
        Transformer.replace(parent, node)
        return
    }
    const node = ts.factory.updateNewExpression(
        parent,
        parent.expression,
        parent.typeArguments,
        list,
    )
    Transformer.replace(parent, node)
}

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

const ExpressionTransformer = {
    addArgument,
    replaceLiteral,
}

export default ExpressionTransformer

import ts from 'typescript'
import ArgumentFactory from '../Factory/ArgumentFactory'
import Transformer from './Transformer'

function addArgument(
    parent: ts.CallExpression | ts.NewExpression,
    parameter: ts.ParameterDeclaration,
) {
    const list = Transformer.insert(
        parent.arguments!,
        ArgumentFactory.makeArgument(parameter),
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

function addNode(parent: ts.ArrayLiteralExpression, at?: ts.Expression) {
    const list = Transformer.insert(
        parent.elements,
        ts.factory.createIdentifier('undefined'),
        at,
    )
    const node = ts.factory.updateArrayLiteralExpression(parent, list)
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
    addNode,
    replaceLiteral,
}

export default ExpressionTransformer

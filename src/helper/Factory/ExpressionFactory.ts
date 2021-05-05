import ts from 'typescript'

export function makeAccess(expression: ts.Expression, name: string) {
    return ts.factory.createPropertyAccessExpression(
        expression,
        ts.factory.createIdentifier(name),
    )
}

export function makeAssign(left: ts.Expression) {
    return ts.factory.createBinaryExpression(
        left,
        ts.SyntaxKind.EqualsToken,
        ts.factory.createNull(),
    )
}

export function makeCall(expression: ts.Expression) {
    return ts.factory.createCallExpression(expression, [], [])
}

export function makeCompute(left: ts.Expression) {
    return ts.factory.createBinaryExpression(
        left,
        ts.SyntaxKind.PlusToken,
        ts.factory.createNull(),
    )
}

export function makeExpressionWithTypeArguments(expression: ts.Expression) {
    return ts.factory.createExpressionWithTypeArguments(expression, [])
}

export function makeNew(expression: ts.Expression) {
    return ts.factory.createNewExpression(expression, [], [])
}

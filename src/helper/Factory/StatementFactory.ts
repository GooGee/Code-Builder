import ts from 'typescript'
import { makeVariable } from './DeclarationFactory'

export function makeAccessStatement() {
    return ts.factory.createExpressionStatement(ts.factory.createThis())
}

export function makeAssignStatement() {
    const expression = ts.factory.createBinaryExpression(
        ts.factory.createIdentifier('variable'),
        ts.SyntaxKind.EqualsToken,
        ts.factory.createNull(),
    )
    return ts.factory.createExpressionStatement(expression)
}

export function makeBreak() {
    return ts.factory.createBreakStatement()
}

export function makeContinue() {
    return ts.factory.createContinueStatement()
}

export function makeExpressionStatement(expression: ts.Expression) {
    return ts.factory.createExpressionStatement(expression)
}

export function makeFor() {
    const variable = ts.factory.createVariableDeclaration(
        'index',
        undefined,
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
        ts.factory.createNumericLiteral('0'),
    )
    const vdl = ts.factory.createVariableDeclarationList(
        [variable],
        ts.NodeFlags.Const,
    )
    const condition = ts.factory.createBinaryExpression(
        variable.name as ts.Identifier,
        ts.SyntaxKind.LessThanToken,
        ts.factory.createIdentifier('length'),
    )
    const incrementor = ts.factory.createBinaryExpression(
        variable.name as ts.Identifier,
        ts.SyntaxKind.PlusEqualsToken,
        ts.factory.createNumericLiteral('1'),
    )
    return ts.factory.createForStatement(
        vdl,
        condition,
        incrementor,
        ts.factory.createBlock([]),
    )
}

export function makeForIn() {
    const variable = ts.factory.createVariableDeclaration('key')
    const vdl = ts.factory.createVariableDeclarationList(
        [variable],
        ts.NodeFlags.Const,
    )
    return ts.factory.createForInStatement(
        vdl,
        ts.factory.createIdentifier('object'),
        ts.factory.createBlock([]),
    )
}

export function makeForOf() {
    const variable = ts.factory.createVariableDeclaration('item')
    const vdl = ts.factory.createVariableDeclarationList(
        [variable],
        ts.NodeFlags.Const,
    )
    return ts.factory.createForOfStatement(
        undefined,
        vdl,
        ts.factory.createIdentifier('list'),
        ts.factory.createBlock([]),
    )
}

export function makeIf() {
    return ts.factory.createIfStatement(
        ts.factory.createTrue(),
        ts.factory.createBlock([]),
        ts.factory.createBlock([]),
    )
}

export function makeReturn() {
    return ts.factory.createReturnStatement()
}

export function makeSwitch() {
    return ts.factory.createSwitchStatement(
        ts.factory.createTrue(),
        ts.factory.createCaseBlock([]),
    )
}

export function makeThrow() {
    return ts.factory.createThrowStatement(
        ts.factory.createNewExpression(
            ts.factory.createIdentifier('Error'),
            undefined,
            [ts.factory.createStringLiteral('Error')],
        ),
    )
}

export function makeTry() {
    const error = ts.factory.createVariableDeclaration('error')
    return ts.factory.createTryStatement(
        ts.factory.createBlock([]),
        ts.factory.createCatchClause(error, ts.factory.createBlock([])),
        ts.factory.createBlock([]),
    )
}

export function makeVariableStatement(name: string) {
    const variable = makeVariable(name)
    const vdl = ts.factory.createVariableDeclarationList(
        [variable],
        ts.NodeFlags.Let,
    )
    return ts.factory.createVariableStatement([], vdl)
}

export function makeVariableDeclarationList(
    variablexx: ts.VariableDeclaration[],
    flag: ts.NodeFlags,
) {
    return ts.factory.createVariableDeclarationList(variablexx, flag)
}

export function makeWhile() {
    return ts.factory.createWhileStatement(
        ts.factory.createFalse(),
        ts.factory.createBlock([]),
    )
}

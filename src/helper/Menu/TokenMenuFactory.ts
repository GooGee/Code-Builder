import ts from 'typescript'
import Transformer from '../Transformer/Transformer'
import MenuFactory from './MenuFactory'

const AssignTokenList = [
    ts.SyntaxKind.PlusEqualsToken,
    ts.SyntaxKind.MinusEqualsToken,
    ts.SyntaxKind.AsteriskEqualsToken,
    ts.SyntaxKind.AsteriskAsteriskEqualsToken,
    ts.SyntaxKind.SlashEqualsToken,
    ts.SyntaxKind.PercentEqualsToken,
    ts.SyntaxKind.LessThanLessThanEqualsToken,
    ts.SyntaxKind.GreaterThanGreaterThanEqualsToken,
    ts.SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken,
    ts.SyntaxKind.AmpersandEqualsToken,
    ts.SyntaxKind.BarEqualsToken,
    ts.SyntaxKind.BarBarEqualsToken,
    ts.SyntaxKind.AmpersandAmpersandEqualsToken,
    ts.SyntaxKind.CaretEqualsToken,
]

export function AssignTokenMenuFactory(token: ts.BinaryOperatorToken) {
    return () => {
        console.log('AssignTokenMenuFactory')
        return makeAllMenu(token, AssignTokenList)
    }
}

const ComputeTokenList = [
    ts.SyntaxKind.LessThanToken,
    ts.SyntaxKind.GreaterThanToken,
    ts.SyntaxKind.LessThanEqualsToken,
    ts.SyntaxKind.GreaterThanEqualsToken,
    ts.SyntaxKind.EqualsEqualsToken,
    ts.SyntaxKind.ExclamationEqualsToken,
    ts.SyntaxKind.EqualsEqualsEqualsToken,
    ts.SyntaxKind.ExclamationEqualsEqualsToken,
    ts.SyntaxKind.PlusToken,
    ts.SyntaxKind.MinusToken,
    ts.SyntaxKind.AsteriskToken,
    ts.SyntaxKind.AsteriskAsteriskToken,
    ts.SyntaxKind.SlashToken,
    ts.SyntaxKind.PercentToken,
    ts.SyntaxKind.LessThanLessThanToken,
    ts.SyntaxKind.GreaterThanGreaterThanToken,
    ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken,
    ts.SyntaxKind.AmpersandToken,
    ts.SyntaxKind.BarToken,
    ts.SyntaxKind.CaretToken,
    ts.SyntaxKind.ExclamationToken,
    ts.SyntaxKind.TildeToken,
    ts.SyntaxKind.AmpersandAmpersandToken,
    ts.SyntaxKind.BarBarToken,
]

export function ComputeTokenMenuFactory(token: ts.BinaryOperatorToken) {
    return () => {
        console.log('ComputeTokenMenuFactory')
        return makeAllMenu(token, ComputeTokenList)
    }
}

export function makeMenu(parent: ts.BinaryExpression, kind: ts.SyntaxKind) {
    const text = ts.tokenToString(kind) ?? ''
    const menu = MenuFactory.makeMenu(text, () => {
        const token = ts.factory.createToken(kind as any)
        Transformer.setProperty(parent, token, 'operatorToken')
    })
    return menu
}

export function makeAllMenu(
    token: ts.BinaryOperatorToken,
    list: Array<ts.SyntaxKind>,
) {
    const menu = MenuFactory.makeMenu('')

    list.forEach((item) => {
        menu.list.push(makeMenu(token.parent as ts.BinaryExpression, item))
    })

    return menu
}

import ts from 'typescript'
import Transformer from '../Transformer/Transformer'
import MenuFactory from './MenuFactory'

const AssignTokenList = [
    ts.SyntaxKind.AmpersandEqualsToken,
    ts.SyntaxKind.BarEqualsToken,
    ts.SyntaxKind.AsteriskEqualsToken,
    ts.SyntaxKind.EqualsToken,
    ts.SyntaxKind.MinusEqualsToken,
    ts.SyntaxKind.PlusEqualsToken,
    ts.SyntaxKind.SlashEqualsToken,
]

export function AssignTokenMenuFactory(token: ts.BinaryOperatorToken) {
    return () => {
        console.log('AssignTokenMenuFactory')
        return makeAllMenu(token, AssignTokenList)
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

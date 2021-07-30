import ts from 'typescript'
import Menu from '../../model/Menu'
import state from '../../state'
import Transformer from '../Transformer/Transformer'
import MenuFactory from './MenuFactory'

function addCallMenu(menu: Menu, node: ts.Identifier) {
    const type = state.worker.checker.getType(node)

    if (ts.isNewExpression(node.parent)) {
        const list = type.getConstructSignatures()
        list.forEach((item) => {
            const text = item.declaration?.getText() ?? '()'
            const mmm = MenuFactory.makeMenu(text, () => {
                const nnn = ts.factory.createNewExpression(node, [], [])
                Transformer.replace(node.parent, nnn)
            })
            menu.list.push(mmm)
        })
        return
    }

    const parent = node.parent
    if (ts.isPropertyAccessExpression(parent)) {
        if (ts.isCallExpression(parent.parent)) {
            const list = type.getCallSignatures()
            list.forEach((item) => {
                const text = item.declaration?.getText() ?? '()'
                const mmm = MenuFactory.makeMenu(text, () => {
                    const nnn = ts.factory.createCallExpression(parent, [], [])
                    Transformer.replace(parent.parent, nnn)
                })
                menu.list.push(mmm)
            })
        } else {
            const list = type.getCallSignatures()
            list.forEach((item) => {
                const text = item.declaration?.getText() ?? '()'
                const mmm = MenuFactory.makeMenu(text, () => {
                    const nnn = ts.factory.createCallExpression(parent, [], [])
                    Transformer.replace(parent, nnn)
                })
                menu.list.push(mmm)
            })
        }
    }
}

function makeMenu(
    item: ts.Symbol,
    node: ts.Identifier | ts.NumericLiteral | ts.StringLiteral,
) {
    return MenuFactory.makeMenu(item.name, () => {
        if (ts.isPropertyAccessExpression(node.parent)) {
            const type = ts.factory.createPropertyAccessExpression(
                node,
                ts.factory.createIdentifier(item.name),
            )
            Transformer.replace(node.parent, type)
            return
        }

        const type = ts.factory.createPropertyAccessExpression(
            node,
            ts.factory.createIdentifier(item.name),
        )
        Transformer.replace(node, type)
    })
}

function makeElementAccessExpressionMenu(node: ts.Identifier) {
    return MenuFactory.makeMenu('[]', () => {
        const nnn = ts.factory.createElementAccessExpression(node, 0)
        Transformer.replace(node, nnn)
    })
}

export default function ObjectChildMenuFactory(
    node: ts.Identifier | ts.NumericLiteral | ts.StringLiteral,
) {
    return () => {
        console.log('ObjectChildMenuFactory')
        const menu = MenuFactory.makeMenu('')
        if (ts.isIdentifier(node)) {
            addCallMenu(menu, node)
        }

        const type = state.worker.checker.getType(node)
        if (ts.isIdentifier(node)) {
            if (type.symbol) {
                if (type.symbol.escapedName === 'Array') {
                    menu.list.push(makeElementAccessExpressionMenu(node))
                }
            } else {
                const ttt = type as any
                if (ttt.intrinsicName === 'string') {
                    menu.list.push(makeElementAccessExpressionMenu(node))
                }
            }
        }

        type.getProperties().forEach((item) => {
            menu.list.push(makeMenu(item, node))
        })
        return menu
    }
}

import ts from 'typescript'
import Menu from '../../model/Menu'
import state from '../../state'
import Transformer from '../Transformer/Transformer'
import MenuFactory from './MenuFactory'

function addCallMenu(menu: Menu, node: ts.Identifier) {
    const type = state.worker.checker.getType(node)

    const csxx = type.getConstructSignatures()
    if (csxx.length) {
        if (ts.isNewExpression(node.parent)) {
            csxx.forEach((item) => {
                const text = item.declaration?.getText() ?? '()'
                const mmm = MenuFactory.makeMenu(text, () => {
                    const nnn = ts.factory.createNewExpression(node, [], [])
                    Transformer.replace(node.parent, nnn)
                })
                menu.list.push(mmm)
            })
        } else {
            csxx.forEach((item) => {
                const text = item.declaration?.getText() ?? '()'
                const mmm = MenuFactory.makeMenu(text, () => {
                    const nnn = ts.factory.createNewExpression(node, [], [])
                    Transformer.replace(node, nnn)
                })
                menu.list.push(mmm)
            })
        }
        return
    }

    const parent = node.parent
    const list = type.getCallSignatures()
    if (ts.isPropertyAccessExpression(parent)) {
        if (ts.isCallExpression(parent.parent)) {
            list.forEach((item) => {
                const text = item.declaration?.getText() ?? '()'
                const mmm = MenuFactory.makeMenu(text, () => {
                    const nnn = ts.factory.createCallExpression(parent, [], [])
                    Transformer.replace(parent.parent, nnn)
                })
                menu.list.push(mmm)
            })
        } else {
            list.forEach((item) => {
                const text = item.declaration?.getText() ?? '()'
                const mmm = MenuFactory.makeMenu(text, () => {
                    const nnn = ts.factory.createCallExpression(parent, [], [])
                    Transformer.replace(parent, nnn)
                })
                menu.list.push(mmm)
            })
        }
    } else if (ts.isCallExpression(parent)) {
        list.forEach((item) => {
            const text = item.declaration?.getText() ?? '()'
            const mmm = MenuFactory.makeMenu(text, () => {
                const nnn = ts.factory.createCallExpression(node, [], [])
                Transformer.replace(parent, nnn)
            })
            menu.list.push(mmm)
        })
    } else {
        list.forEach((item) => {
            const text = item.declaration?.getText() ?? '()'
            const mmm = MenuFactory.makeMenu(text, () => {
                const nnn = ts.factory.createCallExpression(node, [], [])
                Transformer.replace(node, nnn)
            })
            menu.list.push(mmm)
        })
    }
}

function makeMenu(item: ts.Symbol, node: ObjectType) {
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

export type ObjectType =
    | ts.ArrayLiteralExpression
    | ts.CallExpression
    | ts.Identifier
    | ts.NewExpression
    | ts.NumericLiteral
    | ts.StringLiteral
    | ts.ThisExpression

export default function ObjectChildMenuFactory(node: ObjectType) {
    console.log('ObjectChildMenuFactory')
    const menu = MenuFactory.makeMenu('')
    const type = state.worker.checker.getType(node)
    if (ts.isIdentifier(node)) {
        addCallMenu(menu, node)
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

    type.getProperties()
        .filter((item) => item.name[0] !== '_')
        .forEach((item) => {
            menu.list.push(makeMenu(item, node))
        })
    return menu
}

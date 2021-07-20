import ts from 'typescript'
import Menu from '../../model/Menu'
import state from '../../state'
import * as ExpressionFactory from '../Factory/ExpressionFactory'
import Transformer from '../Transformer/Transformer'
import MenuFactory from './MenuFactory'

function makeNumericLiteral(
    text: string,
    parent: ts.Node,
    propertyName: string,
    old?: ts.Expression,
) {
    const node = ts.factory.createNumericLiteral(text)
    Transformer.transform(node, parent, propertyName, old)
}

function makeStringLiteral(
    text: string,
    parent: ts.Node,
    propertyName: string,
    old?: ts.Expression,
) {
    const node = ts.factory.createStringLiteral(text)
    Transformer.transform(node, parent, propertyName, old)
}

function makeConstantMenu(
    parent: ts.Node,
    propertyName: string,
    old?: ts.Expression,
) {
    const menu = MenuFactory.makeMenu('Constant')
    menu.list.push(
        MenuFactory.makeMenu('false', () => {
            const node = ts.factory.createFalse()
            Transformer.transform(node, parent, propertyName, old)
        }),
        MenuFactory.makeMenu('true', () => {
            const node = ts.factory.createTrue()
            Transformer.transform(node, parent, propertyName, old)
        }),
        MenuFactory.makeMenu('null', () => {
            const node = ts.factory.createNull()
            Transformer.transform(node, parent, propertyName, old)
        }),
        MenuFactory.makeMenu('undefined', () => {
            const node = ts.factory.createIdentifier('undefined')
            Transformer.transform(node, parent, propertyName, old)
        }),
        MenuFactory.makeMenu('this', () => {
            const node = ts.factory.createThis()
            Transformer.transform(node, parent, propertyName, old)
        }),
        MenuFactory.makeMenu(
            '0',
            makeNumericLiteral.bind(null, '0', parent, propertyName, old),
        ),
        MenuFactory.makeMenu(
            '1',
            makeNumericLiteral.bind(null, '1', parent, propertyName, old),
        ),
        MenuFactory.makeMenu(
            '-1',
            makeNumericLiteral.bind(null, '-1', parent, propertyName, old),
        ),
        MenuFactory.makeMenu(
            '""',
            makeStringLiteral.bind(null, '', parent, propertyName, old),
        ),
    )
    return menu
}

function makeIdentifierMenu(
    parent: ts.Node,
    propertyName: string,
    old?: ts.Expression,
) {
    const menu = MenuFactory.makeMenu('Identifier')
    state.worker.checker.getVariableList(parent).forEach((item) => {
        menu.list.push(
            MenuFactory.makeMenu(item.name, () => {
                const node = ts.factory.createIdentifier(item.name)
                Transformer.transform(node, parent, propertyName, old)
            }),
        )
    })
    return menu
}

function addCallMenu(menu: Menu, node: ts.Identifier) {
    const type = state.worker.checker.getType(node)

    if (ts.isNewExpression(node.parent)) {
        const list = type.getConstructSignatures()
        list.forEach((item) => {
            const text = item.declaration?.getText() ?? '()'
            const mmm = MenuFactory.makeMenu(text, () => {
                // to do: fill arguments
                const nnn = ExpressionFactory.makeNew(node)
                Transformer.replace(node.parent, nnn)
            })
            menu.list.push(mmm)
        })
        return
    }

    const list = type.getCallSignatures()
    list.forEach((item) => {
        const text = item.declaration?.getText() ?? '()'
        const mmm = MenuFactory.makeMenu(text, () => {
            // to do: fill arguments
            const nnn = ExpressionFactory.makeCall(node)
            Transformer.replace(node.parent, nnn)
        })
        menu.list.push(mmm)
    })
}

export function ObjectChildMenuFactory(
    node: ts.Identifier | ts.NumericLiteral | ts.StringLiteral,
) {
    return () => {
        console.log('ObjectChildMenuFactory')
        const menu = MenuFactory.makeMenu('')
        if (ts.isIdentifier(node)) {
            addCallMenu(menu, node)
        }
        state.worker.checker
            .getType(node)
            .getProperties()
            .forEach((item) => {
                menu.list.push(
                    MenuFactory.makeMenu(item.name, () => {
                        if (ts.isPropertyAccessExpression(node.parent)) {
                            const type =
                                ts.factory.createPropertyAccessExpression(
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
                    }),
                )
            })
        return menu
    }
}

export default function ExpressionMenuFactory(
    parent: ts.Node,
    old?: ts.Expression,
    propertyName: string = 'expression',
    isLeft: boolean = false,
) {
    return () => {
        console.log('ExpressionMenuFactory')

        if (isLeft) {
            return makeIdentifierMenu(parent, propertyName, old)
        }

        const menu = MenuFactory.makeMenu('')
        if (old !== undefined) {
            if (ts.isReturnStatement(old.parent)) {
                MenuFactory.addDelete(menu, old)
                MenuFactory.addSeparator(menu)
            }
        }

        if (old !== undefined) {
            const one = MenuFactory.makeMenu('Compute', () => {
                const node = ExpressionFactory.makeCompute(old)
                Transformer.replace(old, node)
            })
            menu.list.push(one)
        }

        const one = MenuFactory.makeMenu('Enter a Number', () => {
            const value = prompt('Enter a Number')
            if (value === null) {
                return
            }
            if (isNaN(parseFloat(value))) {
                alert('Invalid number')
                return
            }
            makeNumericLiteral(value, parent, propertyName, old)
        })
        menu.list.push(one)

        const two = MenuFactory.makeMenu('Enter a String', () => {
            const value = prompt('Enter a String')
            if (value === null) {
                return
            }
            makeStringLiteral(value, parent, propertyName, old)
        })
        menu.list.push(two)

        MenuFactory.addSeparator(menu)

        menu.list.push(makeConstantMenu(parent, propertyName, old))

        menu.list.push(makeIdentifierMenu(parent, propertyName, old))

        return menu
    }
}

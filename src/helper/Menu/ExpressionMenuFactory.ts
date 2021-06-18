import ts from 'typescript'
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
    const nnn = ts.factory.createNumericLiteral(text)
    Transformer.transform(nnn, parent, propertyName, old)
}

function makeStringLiteral(
    text: string,
    parent: ts.Node,
    propertyName: string,
    old?: ts.Expression,
) {
    const nnn = ts.factory.createStringLiteral(text)
    Transformer.transform(nnn, parent, propertyName, old)
}

function makeConstantMenu(
    parent: ts.Node,
    propertyName: string,
    old?: ts.Expression,
) {
    const menu = MenuFactory.makeMenu('Constant')
    menu.list.push(
        MenuFactory.makeMenu('false', () => {
            const nnn = ts.factory.createFalse()
            Transformer.transform(nnn, parent, propertyName, old)
        }),
        MenuFactory.makeMenu('true', () => {
            const nnn = ts.factory.createTrue()
            Transformer.transform(nnn, parent, propertyName, old)
        }),
        MenuFactory.makeMenu('null', () => {
            const nnn = ts.factory.createNull()
            Transformer.transform(nnn, parent, propertyName, old)
        }),
        MenuFactory.makeMenu('undefined', () => {
            const nnn = ts.factory.createIdentifier('undefined')
            Transformer.transform(nnn, parent, propertyName, old)
        }),
        MenuFactory.makeMenu('this', () => {
            const nnn = ts.factory.createThis()
            Transformer.transform(nnn, parent, propertyName, old)
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
                const nnn = ts.factory.createIdentifier(item.name)
                Transformer.transform(nnn, parent, propertyName, old)
            }),
        )
    })
    return menu
}

export default function ExpressionMenuFactory(
    parent: ts.Node,
    old?: ts.Expression,
    propertyName: string = 'expression',
    isLeft: boolean = false,
) {
    return () => {
        console.log('ExpressionMenuFactory')
        const menu = MenuFactory.makeMenu('')
        if (old !== undefined) {
            if (ts.isReturnStatement(old)) {
                MenuFactory.addDelete(menu, old)
                MenuFactory.addSeparator(menu)
            }

            const one = MenuFactory.makeMenu('Compute', () => {
                const nnn = ExpressionFactory.makeCompute(old)
                Transformer.replace(old, nnn)
            })
            menu.list.push(one)
        }

        if (isLeft === false) {
            menu.list.push(makeConstantMenu(parent, propertyName, old))

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

            menu.list.push(makeIdentifierMenu(parent, propertyName, old))
        }

        return menu
    }
}

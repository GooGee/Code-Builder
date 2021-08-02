import ts from 'typescript'
import CommonTypeList from '../../asset/CommonTypeList'
import state from '../../state'
import Finder from '../Finder'
import LiteralTransformer from '../Transformer/LiteralTransformer'
import Transformer from '../Transformer/Transformer'
import MenuFactory from './MenuFactory'

function makeClassMenu(
    parent: ts.Node,
    propertyName: string,
    old?: ts.Expression,
) {
    const menu = MenuFactory.makeMenu('Class')
    CommonTypeList.forEach((item) => {
        menu.list.push(
            MenuFactory.makeMenu(item, () => {
                const node = ts.factory.createIdentifier(item)
                Transformer.transform(node, parent, propertyName, old)
            }),
        )
    })
    return menu
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
            LiteralTransformer.makeNumericLiteral.bind(
                null,
                '0',
                parent,
                propertyName,
                old,
            ),
        ),
        MenuFactory.makeMenu(
            '1',
            LiteralTransformer.makeNumericLiteral.bind(
                null,
                '1',
                parent,
                propertyName,
                old,
            ),
        ),
        MenuFactory.makeMenu(
            '-1',
            LiteralTransformer.makeNumericLiteral.bind(
                null,
                '-1',
                parent,
                propertyName,
                old,
            ),
        ),
        MenuFactory.makeMenu(
            '""',
            LiteralTransformer.makeStringLiteral.bind(
                null,
                '',
                parent,
                propertyName,
                old,
            ),
        ),
    )
    return menu
}

function makeParameterMenu(
    parent: ts.Node,
    propertyName: string,
    old?: ts.Expression,
) {
    const menu = MenuFactory.makeMenu('Parameter')
    Finder.getParameterList(parent).forEach((item) => {
        menu.list.push(
            MenuFactory.makeMenu(item.name.getText(), () => {
                const node = ts.factory.createIdentifier(item.name.getText())
                Transformer.transform(node, parent, propertyName, old)
            }),
        )
    })
    return menu
}

function makeVariableMenu(
    parent: ts.Node,
    propertyName: string,
    old?: ts.Expression,
) {
    const menu = MenuFactory.makeMenu('Variable')
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

export default function ExpressionMenuFactory(
    parent: ts.Node,
    old?: ts.Expression,
    propertyName: string = 'expression',
    isLeft: boolean = false,
) {
    return () => {
        console.log('ExpressionMenuFactory')

        if (isLeft) {
            return makeVariableMenu(parent, propertyName, old)
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
                const node = ts.factory.createBinaryExpression(
                    old,
                    ts.SyntaxKind.EqualsEqualsEqualsToken,
                    ts.factory.createNull(),
                )
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
            LiteralTransformer.makeNumericLiteral(
                value,
                parent,
                propertyName,
                old,
            )
        })
        menu.list.push(one)

        const two = MenuFactory.makeMenu('Enter a String', () => {
            const value = prompt('Enter a String')
            if (value === null) {
                return
            }
            LiteralTransformer.makeStringLiteral(
                value,
                parent,
                propertyName,
                old,
            )
        })
        menu.list.push(two)

        MenuFactory.addSeparator(menu)

        menu.list.push(makeClassMenu(parent, propertyName, old))

        menu.list.push(makeConstantMenu(parent, propertyName, old))

        menu.list.push(makeParameterMenu(parent, propertyName, old))

        menu.list.push(makeVariableMenu(parent, propertyName, old))

        return menu
    }
}

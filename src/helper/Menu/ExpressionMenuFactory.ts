import ts from 'typescript'
import CommonTypeList from '../../asset/CommonTypeList'
import Finder from '../Finder/Finder'
import ParameterFinder from '../Finder/ParameterFinder'
import VariableFinder from '../Finder/VariableFinder'
import LiteralTransformer from '../Transformer/LiteralTransformer'
import Transformer from '../Transformer/Transformer'
import MenuFactory from './MenuFactory'
import { isComputeToken } from './TokenMenuFactory'
import { ReferenceType } from './TypeMenuFactory'

function makeConstantMenu(
    parent: ts.Node,
    propertyName: string,
    old?: ts.Expression,
) {
    const menu = MenuFactory.makeParentMenu('Constant')
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
        MenuFactory.makeMenu('[]', () => {
            const node = ts.factory.createArrayLiteralExpression()
            Transformer.transform(node, parent, propertyName, old)
        }),
    )
    return menu
}

function makeDeleteMenu(parent: ts.BinaryExpression, old: ts.Expression) {
    return MenuFactory.makeMenu('Delete', () => {
        let keep = parent.left
        if (Object.is(parent.left, old)) {
            keep = parent.right
        }
        if (ts.isParenthesizedExpression(parent.parent)) {
            Transformer.replace(parent.parent, keep)
        } else {
            Transformer.replace(parent, keep)
        }
    })
}

function makeEcmas6ClassMenu(
    parent: ts.Node,
    propertyName: string,
    old?: ts.Expression,
) {
    const menu = MenuFactory.makeParentMenu('ES6 Class')
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

function makeParameterMenu(
    parent: ts.Node,
    propertyName: string,
    old?: ts.Expression,
) {
    const menu = MenuFactory.makeParentMenu('Parameter')
    ParameterFinder.getParameterList(parent).forEach((item) => {
        menu.list.push(
            MenuFactory.makeMenu(item.name.getText(), () => {
                const node = ts.factory.createIdentifier(item.name.getText())
                Transformer.transform(node, parent, propertyName, old)
            }),
        )
    })
    return menu
}

function makeTypeMenu(
    title: string,
    list: ReferenceType[],
    parent: ts.Node,
    propertyName: string,
    old?: ts.Expression,
) {
    const menu = MenuFactory.makeParentMenu(title)
    list.forEach((item) => {
        const name = item.name!.getText()
        menu.list.push(
            MenuFactory.makeMenu(name, () => {
                const node = ts.factory.createIdentifier(name)
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
    const menu = MenuFactory.makeParentMenu('Variable')
    if (Finder.inFunction(parent)) {
        menu.list.push(
            MenuFactory.makeMenu('this', () => {
                const node = ts.factory.createThis()
                Transformer.transform(node, parent, propertyName, old)
            }),
        )
    }
    if (Finder.inClass(parent)) {
        menu.list.push(
            MenuFactory.makeMenu('super', () => {
                const node = ts.factory.createSuper()
                Transformer.transform(node, parent, propertyName, old)
            }),
        )
    }
    VariableFinder.getVariableList(parent).forEach((item) => {
        menu.list.push(
            MenuFactory.makeMenu(item.name.getText(), () => {
                const node = ts.factory.createIdentifier(item.name.getText())
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
    console.log('ExpressionMenuFactory')

    const menu = MenuFactory.makeMenu('')
    if (isLeft) {
        menu.list.push(makeEcmas6ClassMenu(parent, propertyName, old))

        const functionMenu = makeTypeMenu(
            'Function',
            Finder.getFunctionList(parent),
            parent,
            propertyName,
            old,
        )
        menu.list.push(functionMenu)

        menu.list.push(makeParameterMenu(parent, propertyName, old))

        menu.list.push(makeVariableMenu(parent, propertyName, old))

        return menu
    }

    if (old !== undefined) {
        const parent = old.parent
        if (
            ts.isBinaryExpression(parent) &&
            isComputeToken(parent.operatorToken.kind)
        ) {
            menu.list.push(makeDeleteMenu(parent, old))
            MenuFactory.addSeparator(menu)
        } else if (ts.isReturnStatement(old.parent)) {
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
        LiteralTransformer.makeNumericLiteral(value, parent, propertyName, old)
    })
    menu.list.push(one)

    const two = MenuFactory.makeMenu('Enter a String', () => {
        const value = prompt('Enter a String')
        if (value === null) {
            return
        }
        LiteralTransformer.makeStringLiteral(value, parent, propertyName, old)
    })
    menu.list.push(two)

    MenuFactory.addSeparator(menu)

    menu.list.push(makeConstantMenu(parent, propertyName, old))

    const classMenu = makeTypeMenu(
        'Class',
        Finder.getClassList(parent),
        parent,
        propertyName,
        old,
    )
    menu.list.push(classMenu)

    const enumMenu = makeTypeMenu(
        'Enum',
        Finder.getEnumList(parent),
        parent,
        propertyName,
        old,
    )
    menu.list.push(enumMenu)

    const functionMenu = makeTypeMenu(
        'Function',
        Finder.getFunctionList(parent),
        parent,
        propertyName,
        old,
    )
    menu.list.push(functionMenu)

    menu.list.push(makeEcmas6ClassMenu(parent, propertyName, old))

    menu.list.push(makeParameterMenu(parent, propertyName, old))

    menu.list.push(makeVariableMenu(parent, propertyName, old))

    return menu
}

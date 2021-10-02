import ts from 'typescript'
import Menu from '../../model/Menu'
import state from '../../state'
import TypeArgumentFactory from '../Factory/TypeArgumentFactory'
import Transformer from '../Transformer/Transformer'
import MenuFactory from './MenuFactory'

function addDeleteMenu(menu: Menu, node: ObjectType, root: ts.Expression) {
    if (ts.isArrayLiteralExpression(node)) {
        return
    }
    if (ts.isLiteralExpression(node)) {
        return
    }
    if (node.kind === ts.SyntaxKind.ThisKeyword) {
        return
    }

    const parent = node.parent
    if (ts.isPropertyAccessExpression(parent)) {
        if (Object.is(parent.expression, node)) {
            return
        }
        menu.list.push(
            MenuFactory.makeMenu('Delete', () => {
                if (window.confirm('Are you sure?')) {
                    Transformer.replace(root, parent.expression)
                }
            }),
        )
        MenuFactory.addSeparator(menu)
        return
    }
}

function addCallNewMenu(menu: Menu, node: ts.Identifier) {
    const type = state.worker.checker.getType(node)

    const csxx = type.getConstructSignatures()
    if (csxx.length) {
        if (ts.isNewExpression(node.parent)) {
            addNewMenu(csxx, menu, node, node.parent)
        } else {
            addNewMenu(csxx, menu, node, node)
        }
        return
    }

    makeCallMenu(menu, type.getCallSignatures(), node.parent, node)
}

function addCallMenu(
    list: readonly ts.Signature[],
    menu: Menu,
    node: ts.Identifier | ts.PropertyAccessExpression,
    replace: ts.Node,
) {
    list.forEach((item) => {
        const typeArgumentxx = getTypeArgumentList(item.declaration)
        let text = '()'
        if (item.declaration) {
            if (ts.isFunctionLike(item.declaration)) {
                text = getSignatureDeclarationText(item.declaration)
            }
        }
        const mmm = MenuFactory.makeMenu(text, () => {
            const nnn = ts.factory.createCallExpression(
                node,
                typeArgumentxx,
                [],
            )
            Transformer.replace(replace, nnn)
        })
        menu.list.push(mmm)
    })
}

function addNewMenu(
    list: readonly ts.Signature[],
    menu: Menu,
    node: ts.Identifier,
    replace: ts.Node,
) {
    list.forEach((item) => {
        const typeArgumentxx = getTypeArgumentList(item.declaration)
        const text = item.declaration?.getText() ?? '()'
        const mmm = MenuFactory.makeMenu(text, () => {
            const nnn = ts.factory.createNewExpression(node, typeArgumentxx, [])
            Transformer.replace(replace, nnn)
        })
        menu.list.push(mmm)
    })
}

function getSignatureDeclarationText(declaration: ts.SignatureDeclaration) {
    const list = [declaration.name?.getText() ?? '']
    if (declaration.typeParameters) {
        if (declaration.typeParameters.length) {
            const text = declaration.typeParameters
                .map((item) => item.getText())
                .join(', ')
            list.push(`<${text}>`)
        }
    }
    let noParameter = true
    if (declaration.parameters) {
        if (declaration.parameters.length) {
            noParameter = false
            const text = declaration.parameters
                .map((item) => item.getText())
                .join(', ')
            list.push(`(${text})`)
        }
    }
    if (noParameter) {
        list.push('( )')
    }
    return list.join(' ')
}

function getTypeArgumentList(
    declaration?: ts.SignatureDeclaration | ts.JSDocSignature,
): ts.TypeNode[] {
    if (declaration === undefined) {
        return []
    }

    if (ts.isFunctionLike(declaration)) {
        if (declaration.typeParameters) {
            return TypeArgumentFactory.makeTypeArgumentList(
                declaration.typeParameters,
            )
        }
    }

    return []
}

function makeCallMenu(
    menu: Menu,
    list: readonly ts.Signature[],
    parent: ts.Node,
    node: ts.Identifier | ts.PropertyAccessExpression,
) {
    if (ts.isPropertyAccessExpression(parent)) {
        makeCallMenu(menu, list, parent.parent, parent)
        return
    }

    if (ts.isCallExpression(parent)) {
        addCallMenu(list, menu, node, parent)
        return
    }

    addCallMenu(list, menu, node, node)
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

export default function ObjectChildMenuFactory(
    node: ObjectType,
    root: ts.Expression,
) {
    console.log('ObjectChildMenuFactory')
    const menu = MenuFactory.makeMenu('')
    addDeleteMenu(menu, node, root)

    const type = state.worker.checker.getType(node)
    if (ts.isIdentifier(node)) {
        addCallNewMenu(menu, node)
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
        .sort((aaa, bbb) => aaa.name.localeCompare(bbb.name))
        .forEach((item) => {
            menu.list.push(makeMenu(item, node))
        })
    return menu
}

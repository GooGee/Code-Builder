import ts from 'typescript'
import Menu from '../../model/Menu'
import Transformer from '../Transformer/Transformer'
import MenuFactory from './MenuFactory'

function makeClassHeritageClause(menu: Menu, parent: ts.ClassLikeDeclaration) {
    if (parent.heritageClauses) {
        if (parent.heritageClauses.length === 2) {
            return
        }
        let title = '+ extends'
        const list: ts.HeritageClause[] = []
        const hc = parent.heritageClauses[0]
        if (hc.token === ts.SyntaxKind.ExtendsKeyword) {
            title = '+ implements'
            list.push(hc)
            list.push(makeHeritageClause(ts.SyntaxKind.ImplementsKeyword))
        } else {
            list.push(makeHeritageClause(ts.SyntaxKind.ExtendsKeyword))
            list.push(hc)
        }
        menu.list.push(
            MenuFactory.makeMenu(title, () => {
                Transformer.setProperty(
                    parent,
                    ts.factory.createNodeArray(list),
                    'heritageClauses',
                )
            }),
        )
        return
    }

    menu.list.push(makeExtendsMenu(parent))
    const list = ts.factory.createNodeArray([
        makeHeritageClause(ts.SyntaxKind.ImplementsKeyword),
    ])
    menu.list.push(
        MenuFactory.makeMenu('+ implements', () => {
            Transformer.setProperty(parent, list, 'heritageClauses')
        }),
    )
}

function makeExtendsMenu(
    parent: ts.ClassLikeDeclaration | ts.InterfaceDeclaration,
) {
    const list = ts.factory.createNodeArray([
        makeHeritageClause(ts.SyntaxKind.ExtendsKeyword),
    ])
    return MenuFactory.makeMenu('+ extends', () => {
        Transformer.setProperty(parent, list, 'heritageClauses')
    })
}

function makeHeritageClause(
    kind: ts.SyntaxKind.ExtendsKeyword | ts.SyntaxKind.ImplementsKeyword,
) {
    return ts.factory.createHeritageClause(kind, [
        ts.factory.createExpressionWithTypeArguments(
            ts.factory.createIdentifier('Object'),
            undefined,
        ),
    ])
}

export default function HeritageClauseMenuFactory(
    parent: ts.ClassLikeDeclaration | ts.InterfaceDeclaration,
    at?: ts.HeritageClause,
) {
    console.log('HeritageClauseMenuFactory')
    const menu = MenuFactory.makeMenu('')

    if (at !== undefined) {
        MenuFactory.addDelete(menu, at)
        MenuFactory.addSeparator(menu)
    }

    if (ts.isInterfaceDeclaration(parent)) {
        if (parent.heritageClauses) {
            return menu
        }
        menu.list.push(makeExtendsMenu(parent))
        return menu
    }

    makeClassHeritageClause(menu, parent)
    return menu
}

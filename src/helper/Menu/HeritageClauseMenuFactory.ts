import ts from 'typescript'
import Transformer from '../Transformer/Transformer'
import MenuFactory from './MenuFactory'

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
    return () => {
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

        return menu
    }
}

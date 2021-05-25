import ts from 'typescript'
import * as DeclarationFactory from '../Factory/DeclarationFactory'
import InterfaceTransformer from '../Transformer/InterfaceTransformer'
import MenuFactory from './MenuFactory'

export default function InterfaceMenuFactory(
    parent: ts.InterfaceDeclaration,
    at?: ts.TypeElement,
) {
    return () => {
        console.log('InterfaceMenuFactory')
        const menu = MenuFactory.makeMenu('')
        if (at !== undefined) {
            MenuFactory.addDelete(menu, at)
            MenuFactory.addSeparator(menu)
        }

        menu.list.push(
            MenuFactory.makeMenu('+ constructor', () => {
                const item =
                    DeclarationFactory.makeMethodSignature('constructor')
                InterfaceTransformer.addNote(parent, item, at)
            }),
            MenuFactory.makeMenu('+ method', () => {
                const item =
                    DeclarationFactory.makeMethodSignature('MethodName')
                InterfaceTransformer.addNote(parent, item, at)
            }),
            MenuFactory.makeMenu('+ property', () => {
                const item =
                    DeclarationFactory.makePropertySignature('PropertyName')
                InterfaceTransformer.addNote(parent, item, at)
            }),
        )
        return menu
    }
}

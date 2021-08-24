import ts from 'typescript'
import * as DeclarationFactory from '../Factory/DeclarationFactory'
import InterfaceTransformer from '../Transformer/InterfaceTransformer'
import { makeName } from './ClassMenuFactory'
import MenuFactory from './MenuFactory'

export default function InterfaceMenuFactory(
    parent: ts.InterfaceDeclaration,
    at?: ts.TypeElement,
) {
    console.log('InterfaceMenuFactory')
    const menu = MenuFactory.makeMenu('')
    if (at !== undefined) {
        MenuFactory.addDelete(menu, at)
        MenuFactory.addSeparator(menu)
    }

    menu.list.push(
        MenuFactory.makeMenu('+ constructor', () => {
            const text = makeName(parent.members, 'constructor')
            if (text === null) {
                return
            }
            const item = DeclarationFactory.makeMethodSignature(text)
            InterfaceTransformer.addNode(parent, item, at)
        }),
        MenuFactory.makeMenu('+ method', () => {
            const text = makeName(parent.members)
            if (text === null) {
                return
            }
            const item = DeclarationFactory.makeMethodSignature(text)
            InterfaceTransformer.addNode(parent, item, at)
        }),
        MenuFactory.makeMenu('+ property', () => {
            const text = makeName(parent.members)
            if (text === null) {
                return
            }
            const item = DeclarationFactory.makePropertySignature(text)
            InterfaceTransformer.addNode(parent, item, at)
        }),
    )
    return menu
}

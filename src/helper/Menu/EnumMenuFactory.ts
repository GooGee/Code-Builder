import ts from 'typescript'
import * as DeclarationFactory from '../Factory/DeclarationFactory'
import EnumTransformer from '../Transformer/EnumTransformer'
import { makeName } from './ClassMenuFactory'
import MenuFactory from './MenuFactory'

export default function EnumMenuFactory(
    parent: ts.EnumDeclaration,
    at?: ts.EnumMember,
) {
    console.log('EnumMenuFactory')
    const menu = MenuFactory.makeMenu('')
    if (at !== undefined) {
        MenuFactory.addDelete(menu, at)
        MenuFactory.addSeparator(menu)
    }

    menu.list.push(
        MenuFactory.makeMenu('+ member', () => {
            const text = makeName(parent.members)
            if (text === null) {
                return
            }
            const item = DeclarationFactory.makeEnumMember(text)
            EnumTransformer.addNode(parent, item, at)
        }),
    )
    return menu
}

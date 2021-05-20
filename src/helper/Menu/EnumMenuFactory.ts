import ts from 'typescript'
import * as DeclarationFactory from '../Factory/DeclarationFactory'
import EnumTransformer from '../Transformer/EnumTransformer'
import MenuFactory from './MenuFactory'

export default function EnumMenuFactory(
    parent: ts.EnumDeclaration,
    at?: ts.EnumMember,
) {
    return () => {
        console.log('EnumMenuFactory')
        const menu = MenuFactory.makeMenu('')
        if (at !== undefined) {
            MenuFactory.addDelete(menu, at)
        }

        menu.list.push(
            MenuFactory.makeMenu('+ member', () => {
                const item = DeclarationFactory.makeEnumMember('MemberName')
                EnumTransformer.addNote(parent, item, at)
            }),
        )
        return menu
    }
}

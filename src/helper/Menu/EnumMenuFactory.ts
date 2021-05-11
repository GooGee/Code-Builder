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
            menu.list.push(
                MenuFactory.makeMenu('Delete', () => {
                    EnumTransformer.deleteNote(parent, at)
                }),
                MenuFactory.makeMenu('----', MenuFactory.nothing, true),
            )
        }

        menu.list.push(
            MenuFactory.makeMenu('+ member', () => {
                const item = DeclarationFactory.makeEnumMember('name')
                EnumTransformer.addNote(parent, item, at)
            }),
        )
        return menu
    }
}

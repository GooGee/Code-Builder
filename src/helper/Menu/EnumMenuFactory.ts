import ts from 'typescript'
import * as DeclarationFactory from '../Factory/DeclarationFactory'
import InputTool from '../InputTool'
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
            MenuFactory.addSeparator(menu)
        }

        menu.list.push(
            MenuFactory.makeMenu('+ member', () => {
                const text = InputTool.inputName()
                if (text === null) {
                    return
                }
                const item = DeclarationFactory.makeEnumMember(text)
                EnumTransformer.addNode(parent, item, at)
            }),
        )
        return menu
    }
}

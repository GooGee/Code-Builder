import ts from 'typescript'
import * as DeclarationFactory from '../Factory/DeclarationFactory'
import InputTool from '../InputTool'
import EnumTransformer from '../Transformer/EnumTransformer'
import Transformer from '../Transformer/Transformer'
import { makeName } from './ClassMenuFactory'
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

            menu.list.push(
                MenuFactory.makeMenu('Refactor', () => {
                    try {
                        const text = InputTool.inputName(
                            undefined,
                            at.name.getText(),
                        )
                        if (text === null) {
                            return
                        }
                        if (text === at.name.getText()) {
                            return
                        }

                        const item = ts.factory.createIdentifier(text)
                        Transformer.replace(at.name, item)
                    } catch (error) {
                        if (error.message) {
                            window.alert(error.message)
                        } else {
                            window.alert(error)
                        }
                    }
                }),
            )
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
}

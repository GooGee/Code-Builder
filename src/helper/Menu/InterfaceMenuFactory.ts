import ts from 'typescript'
import * as DeclarationFactory from '../Factory/DeclarationFactory'
import InputTool from '../InputTool'
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
                InterfaceTransformer.addNode(parent, item, at)
            }),
            MenuFactory.makeMenu('+ method', () => {
                const text = InputTool.inputName()
                if (text === null) {
                    return
                }

                const item =
                    DeclarationFactory.makeMethodSignature(text)
                InterfaceTransformer.addNode(parent, item, at)
            }),
            MenuFactory.makeMenu('+ property', () => {
                const text = InputTool.inputName()
                if (text === null) {
                    return
                }

                const item =
                    DeclarationFactory.makePropertySignature(text)
                InterfaceTransformer.addNode(parent, item, at)
            }),
        )
        return menu
    }
}

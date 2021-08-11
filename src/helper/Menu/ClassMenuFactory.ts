import ts from 'typescript'
import * as DeclarationFactory from '../Factory/DeclarationFactory'
import InputTool from '../InputTool'
import ClassTransformer from '../Transformer/ClassTransformer'
import MenuFactory from './MenuFactory'

export default function ClassMenuFactory(
    parent: ts.ClassDeclaration,
    at?: ts.ClassElement,
) {
    return () => {
        console.log('ClassMenuFactory')
        const menu = MenuFactory.makeMenu('')
        if (at !== undefined) {
            MenuFactory.addDelete(menu, at)
            MenuFactory.addSeparator(menu)
        }

        menu.list.push(
            MenuFactory.makeMenu('+ constructor', () => {
                const item = DeclarationFactory.makeConstructor()
                ClassTransformer.addNode(parent, item, at)
            }),
            MenuFactory.makeMenu('+ method', () => {
                const text = InputTool.inputName()
                if (text === null) {
                    return
                }

                const item = DeclarationFactory.makeMethod(text)
                ClassTransformer.addNode(parent, item, at)
            }),
            MenuFactory.makeMenu('+ property', () => {
                const text = InputTool.inputName()
                if (text === null) {
                    return
                }

                const item = DeclarationFactory.makeProperty(text)
                ClassTransformer.addNode(parent, item, at)
            }),
        )
        return menu
    }
}

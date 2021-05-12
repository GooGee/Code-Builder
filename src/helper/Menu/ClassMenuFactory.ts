import ts from 'typescript'
import * as DeclarationFactory from '../Factory/DeclarationFactory'
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
            menu.list.push(
                MenuFactory.makeMenu('Delete', () => {
                    ClassTransformer.deleteNote(parent, at)
                }),
                MenuFactory.makeMenu('----', MenuFactory.nothing, true),
            )
        }

        menu.list.push(
            MenuFactory.makeMenu('+ constructor', () => {
                const item = DeclarationFactory.makeConstructor()
                ClassTransformer.addNote(parent, item, at)
            }),
            MenuFactory.makeMenu('+ method', () => {
                const item = DeclarationFactory.makeMethod('MethodName')
                ClassTransformer.addNote(parent, item, at)
            }),
            MenuFactory.makeMenu('+ property', () => {
                const item = DeclarationFactory.makeProperty('PropertyName')
                ClassTransformer.addNote(parent, item, at)
            }),
        )
        return menu
    }
}

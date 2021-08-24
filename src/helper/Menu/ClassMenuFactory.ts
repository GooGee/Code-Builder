import ts from 'typescript'
import * as DeclarationFactory from '../Factory/DeclarationFactory'
import InputTool from '../InputTool'
import ClassTransformer from '../Transformer/ClassTransformer'
import MenuFactory from './MenuFactory'

export function makeName(
    members: ts.NodeArray<ts.NamedDeclaration>,
    name?: string,
) {
    try {
        const text = InputTool.inputName(undefined, name)
        if (text === null) {
            return null
        }

        const found = members.find((item) => item.name?.getText() === text)
        if (found) {
            window.alert(text + ' already exists!')
            return null
        }
        return text
    } catch (error) {
        if (error.message) {
            window.alert(error.message)
        } else {
            window.alert(error)
        }
        return null
    }
}

export default function ClassMenuFactory(
    parent: ts.ClassLikeDeclaration,
    at?: ts.ClassElement,
) {
    console.log('ClassMenuFactory')
    const menu = MenuFactory.makeMenu('')
    if (at !== undefined) {
        MenuFactory.addDelete(menu, at)
        MenuFactory.addSeparator(menu)
    }

    menu.list.push(
        MenuFactory.makeMenu('+ constructor', () => {
            const found = parent.members.find((item) =>
                ts.isConstructorDeclaration(item),
            )
            if (found) {
                window.alert('constructor already exists!')
                return
            }
            const item = DeclarationFactory.makeConstructor()
            ClassTransformer.addNode(parent, item, at)
        }),
        MenuFactory.makeMenu('+ method', () => {
            const text = makeName(parent.members)
            if (text === null) {
                return
            }
            const item = DeclarationFactory.makeMethod(text)
            ClassTransformer.addNode(parent, item, at)
        }),
        MenuFactory.makeMenu('+ property', () => {
            const text = makeName(parent.members)
            if (text === null) {
                return
            }
            const item = DeclarationFactory.makeProperty(text)
            ClassTransformer.addNode(parent, item, at)
        }),
    )
    return menu
}

import ts from 'typescript'
import Menu from '../../model/Menu'
import * as DeclarationFactory from '../Factory/DeclarationFactory'
import InputTool from '../InputTool'
import ClassTransformer from '../Transformer/ClassTransformer'
import Transformer from '../Transformer/Transformer'
import MenuFactory from './MenuFactory'

const ModifierMap = new Map([
    [ts.SyntaxKind.PrivateKeyword, 'private'],
    [ts.SyntaxKind.ProtectedKeyword, 'protected'],
    [ts.SyntaxKind.PublicKeyword, 'public'],
])

function addModifierMenu(at: ts.ClassElement, menu: Menu) {
    if (ts.isConstructorDeclaration(at)) {
        return
    }

    const list = at.modifiers ? Array.from(at.modifiers) : []
    if (list.length) {
        const keyxx = Array.from(ModifierMap.keys())
        const found = list.find((item) => keyxx.includes(item.kind))
        if (found) {
            list.splice(list.indexOf(found), 1)
        }
    }

    menu.list.push(
        makeModifierMenu(
            ModifierMap.get(ts.SyntaxKind.PrivateKeyword)!,
            ts.SyntaxKind.PrivateKeyword,
            list,
            at,
        ),
        makeModifierMenu(
            ModifierMap.get(ts.SyntaxKind.ProtectedKeyword)!,
            ts.SyntaxKind.ProtectedKeyword,
            list,
            at,
        ),
        makeModifierMenu(
            ModifierMap.get(ts.SyntaxKind.PublicKeyword)!,
            ts.SyntaxKind.PublicKeyword,
            list,
            at,
        ),
    )
}

function makeModifierMenu(
    title: string,
    kind: ts.ModifierSyntaxKind,
    list: ts.Modifier[],
    at: ts.ClassElement,
) {
    const modifier = Array.from(list)
    return MenuFactory.makeMenu(title, () => {
        modifier.push(ts.factory.createModifier(kind))
        Transformer.setProperty(
            at,
            ts.factory.createNodeArray(modifier),
            'modifiers',
        )
    })
}

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
        addModifierMenu(at, menu)
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

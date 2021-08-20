import ts from 'typescript'
import CommonTypeList from '../../asset/CommonTypeList'
import KeywordTypeList from '../../asset/KeywordTypeList'
import state from '../../state'
import TypeArgumentFactory from '../Factory/TypeArgumentFactory'
import Finder from '../Finder/Finder'
import KeywordText from '../KeywordText'
import Transformer from '../Transformer/Transformer'
import MenuFactory from './MenuFactory'

export interface ReferenceType {
    name?: ts.Identifier
    typeParameters?: ts.NodeArray<ts.TypeParameterDeclaration>
}

function getPropertyName(parent: ts.Node) {
    if (ts.isTypeParameterDeclaration(parent)) {
        // parent.constraint
        return 'constraint'
    }
    if (ts.isArrayTypeNode(parent)) {
        // parent.elementType
        return 'elementType'
    }

    return 'type'
}

function getTypeArgumentList(declaration: ReferenceType) {
    if (declaration.typeParameters) {
        return TypeArgumentFactory.makeTypeArgumentList(
            declaration.typeParameters,
        )
    }
    return []
}

function makeBasicTypeMenu(
    parent: ts.Node,
    node?: ts.TypeNode | ts.Identifier,
) {
    const menu = MenuFactory.makeMenu('Basic')
    KeywordTypeList.forEach((item) => {
        menu.list.push(
            MenuFactory.makeMenu(KeywordText(item)!, () => {
                const type = ts.factory.createKeywordTypeNode(item)
                Transformer.transform(
                    type,
                    parent,
                    getPropertyName(parent),
                    node,
                )
            }),
        )
    })
    menu.list.push(
        MenuFactory.makeMenu('null', () => {
            const type = ts.factory.createLiteralTypeNode(
                ts.factory.createNull(),
            )
            Transformer.transform(type, parent, getPropertyName(parent), node)
        }),
    )
    return menu
}

function makeEnumTypeMenu(parent: ts.Node, node?: ts.TypeNode | ts.Identifier) {
    const menu = MenuFactory.makeMenu('Enum')
    Finder.getEnumList(parent).forEach((item) => {
        const name = item.name.getText()
        menu.list.push(
            MenuFactory.makeMenu(name, () => {
                const type = ts.factory.createTypeReferenceNode(name)
                Transformer.transform(
                    type,
                    parent,
                    getPropertyName(parent),
                    node,
                )
            }),
        )
    })
    return menu
}

export function makeEcmas6ClassTypeMenu(
    parent: ts.Node,
    node?: ts.TypeNode | ts.Identifier,
) {
    const menu = MenuFactory.makeMenu('ES6 Class')
    CommonTypeList.forEach((item) => {
        menu.list.push(
            MenuFactory.makeMenu(item, () => {
                // console.log(node)
                let list: ts.TypeNode[] = []
                const found = state.worker.checker
                    .getTypeList(parent)
                    .find((symbol) => symbol.name === item)
                if (found) {
                    // console.log(found)
                    if (found.declarations.length) {
                        const declaration = found
                            .declarations[0] as ReferenceType
                        // console.log(declaration)
                        list = getTypeArgumentList(declaration)
                    }
                }
                const type = ts.factory.createTypeReferenceNode(item, list)
                Transformer.transform(
                    type,
                    parent,
                    getPropertyName(parent),
                    node,
                )
            }),
        )
    })
    return menu
}

export function makeTypeMenu(
    title: string,
    list: ReferenceType[],
    parent: ts.Node,
    node?: ts.TypeNode | ts.Identifier,
) {
    const menu = MenuFactory.makeMenu(title)
    list.forEach((item) => {
        const name = item.name!.getText()
        menu.list.push(
            MenuFactory.makeMenu(name, () => {
                const list = getTypeArgumentList(item)
                const type = ts.factory.createTypeReferenceNode(name, list)
                Transformer.transform(
                    type,
                    parent,
                    getPropertyName(parent),
                    node,
                )
            }),
        )
    })
    return menu
}

export function ModuleChildMenuFactory(node: ts.EntityName) {
    return () => {
        console.log('ModuleChildMenuFactory')
        const menu = MenuFactory.makeMenu('')
        state.worker.checker
            .getType(node)
            .getProperties()
            .forEach((item) => {
                menu.list.push(
                    MenuFactory.makeMenu(item.name, () => {
                        const type = ts.factory.createQualifiedName(
                            node,
                            ts.factory.createIdentifier(item.name),
                        )
                        Transformer.replace(node, type)
                    }),
                )
            })
        return menu
    }
}

export default function TypeMenuFactory(
    parent: ts.Node,
    node?: ts.TypeNode | ts.Identifier,
    required = false,
) {
    return () => {
        console.log('TypeMenuFactory')
        const menu = MenuFactory.makeMenu('')
        if (node !== undefined && required === false) {
            MenuFactory.addDelete(menu, node)
            MenuFactory.addSeparator(menu)
        }

        const classMenu = makeTypeMenu(
            'Class',
            Finder.getClassList(parent),
            parent,
            node,
        )
        const interfaceMenu = makeTypeMenu(
            'Interface',
            Finder.getInterfaceList(parent),
            parent,
            node,
        )
        const typeAliasMenu = makeTypeMenu(
            'TypeAlias',
            Finder.getTypeAliasList(parent),
            parent,
            node,
        )
        menu.list.push(
            makeBasicTypeMenu(parent, node),
            makeEcmas6ClassTypeMenu(parent, node),
            classMenu,
            makeEnumTypeMenu(parent, node),
            interfaceMenu,
            typeAliasMenu,
        )
        return menu
    }
}

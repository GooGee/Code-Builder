import ts from 'typescript'
import Finder from '../Finder/Finder'
import MenuFactory from './MenuFactory'
import { makeEcmas6ClassTypeMenu, makeTypeMenu } from './TypeMenuFactory'

export default function ObjectTypeMenuFactory(
    parent: ts.Node,
    node?: ts.TypeNode | ts.Identifier,
    required = false,
) {
    console.log('ObjectTypeMenu')
    const menu = MenuFactory.makeMenu('')
    if (node !== undefined && !required) {
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

    menu.list.push(
        makeEcmas6ClassTypeMenu(parent, node),
        classMenu,
        interfaceMenu,
    )
    return menu
}

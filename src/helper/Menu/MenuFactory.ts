import ts from 'typescript'
import Menu, { CallBack } from '../../model/Menu'
import Transformer from '../Transformer/Transformer'

const nothing = () => {}

function addDelete(menu: Menu, from: ts.Node, to?: ts.Node) {
    menu.list.push(
        makeMenu('Delete', () => {
            if (window.confirm('Are you sure?')) {
                Transformer.replace(from, to)
            }
        }),
    )
}

function addSeparator(menu: Menu) {
    menu.list.push(makeMenu('----', nothing, true, true))
}

function makeMenu(
    title: string,
    cb: CallBack = nothing,
    disabled = false,
    isDivider = false,
    isParent = false,
) {
    return new Menu(title, cb, disabled, isDivider, isParent)
}

function makeParentMenu(title: string) {
    return makeMenu(title, undefined, false, false, true)
}

const MenuFactory = {
    addDelete,
    addSeparator,
    makeMenu,
    makeParentMenu,
    nothing,
}

export default MenuFactory

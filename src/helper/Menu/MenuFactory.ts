import ts from 'typescript'
import Menu, { CallBack } from '../../model/Menu'
import Transformer from '../Transformer/Transformer'

const nothing = () => {}

function addDelete(menu: Menu, node: ts.Node) {
    menu.list.push(
        makeMenu('Delete', () => {
            Transformer.replace(node, undefined)
        }),
    )
}

function addSeparator(menu: Menu) {
    menu.list.push(makeMenu('----', nothing, true))
}

function makeMenu(title: string, cb: CallBack = nothing, disabled = false) {
    return new Menu(title, cb, disabled)
}

export default {
    addDelete,
    addSeparator,
    makeMenu,
    nothing,
}

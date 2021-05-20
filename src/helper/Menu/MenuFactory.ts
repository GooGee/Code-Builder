import ts from 'typescript'
import Menu, { CallBack } from '../../model/Menu'
import Transformer from '../Transformer/Transformer'

const nothing = () => {}

function addDelete(menu: Menu, node: ts.Node) {
    menu.list.push(
        makeMenu('Delete', () => {
            Transformer.transform(node, undefined)
        }),
        makeMenu('----', nothing, true),
    )
}

function makeMenu(title: string, cb: CallBack = nothing, disabled = false) {
    return new Menu(title, cb, disabled)
}

export default {
    addDelete,
    makeMenu,
    nothing,
}

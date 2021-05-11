import Menu, { CallBack } from '../../model/Menu'

const nothing = () => {}

function makeMenu(title: string, cb: CallBack = nothing, disabled = false) {
    return new Menu(title, cb, disabled)
}

export default {
    makeMenu,
    nothing,
}

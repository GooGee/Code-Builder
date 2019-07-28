import { remote } from 'electron'

export interface CallBack {
    (label: string): void
}

export default class Menu {
    menu: Electron.Menu = new remote.Menu

    add(label: string, lambda: CallBack) {
        const iii = new remote.MenuItem({
            label: label,
            click: () => lambda(label)
        })
        this.menu.append(iii)
        return this
    }

    addMenu(label: string, menu: Menu) {
        const iii = new remote.MenuItem({
            label: label,
            submenu: menu.menu
        })
        this.menu.append(iii)
        return this
    }

    addSeparator() {
        const iii = new remote.MenuItem({
            type: 'separator'
        })
        this.menu.append(iii)
        return this
    }

    makeList(list: Array<any>, text: string, lambda: CallBack) {
        list.forEach(item => {
            let label = item
            if (text) {
                label = item[text]
            }
            this.add(label, lambda)
        })
        return this
    }

    show() {
        this.menu.popup({})
    }
}

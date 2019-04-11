import { remote } from 'electron'

export interface CallBack {
    (item: any): void
}

export default class Menu {
    menu = new remote.Menu

    add(label: string, lambda: CallBack) {
        let iii = new remote.MenuItem({
            label: label,
            click: () => lambda(label)
        })
        this.menu.append(iii)
        return this
    }

    addSeparator() {
        let iii = new remote.MenuItem({
            type: 'separator'
        })
        this.menu.append(iii)
    }

    make(item: any, text: string, lambda: CallBack) {
        let label = item
        if (text) {
            label = item[text]
        }
        let iii = new remote.MenuItem({
            label: label,
            click: () => lambda(item)
        })
        this.menu.append(iii)
        return this
    }

    makeList(list: Array<any>, text: string, lambda: CallBack) {
        list.forEach(item => this.make(item, text, lambda))
        return this
    }

    show() {
        this.menu.popup({})
    }
}

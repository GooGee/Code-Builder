import Menu, { CallBack } from "./Menu"
import { Builder } from "../Builder"

export default class TypeMenu {
    builder: Builder
    kind: string

    constructor(builder: Builder, kind: string = 'Property') {
        this.builder = builder
        this.kind = kind
    }

    get project() {
        return this.builder.project!
    }

    get module() {
        return this.builder.module!
    }

    show(CallBack: CallBack) {
        let menu = new Menu()

        if (this.kind != 'Type') {
            menu.addMenu('Basic', this.makeBasicMenu(CallBack))
        }

        menu.add('Module', label => CallBack('$Module'))

        menu.addMenu('Type', this.makeTypeMenu(CallBack))

        menu.show()
    }

    makeBasicMenu(CallBack: CallBack) {
        let menu = new Menu()
        let list = [
            { name: 'boolean' },
            { name: 'number' },
            { name: 'string' },
            { name: 'void' }
        ]
        if (this.kind == 'Property') {
            list.pop() // remove type void
        }
        list.forEach(type => {
            menu.add(type.name, label => CallBack(label))
        })
        return menu
    }

    makeTypeMenu(CallBack: CallBack) {
        let menu = new Menu()
        let list = this.project.getTypeList(this.module)
        list.forEach(type => {
            menu.add(type.name, label => CallBack(label))
        })
        return menu
    }
}

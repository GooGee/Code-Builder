import Menu, { CallBack } from "./Menu"
import { Builder } from "../Builder"
import { OwnerKind } from "../data/TypeBox"

export default class TypeMenu {
    builder: Builder
    kind: OwnerKind

    constructor(builder: Builder, kind: OwnerKind) {
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
        const menu = new Menu()

        if (this.kind != OwnerKind.Type) {
            this.addBasicMenu(CallBack, menu)
            menu.addSeparator()
        }

        menu.add('Module', label => CallBack('$Module'))

        menu.addMenu('Type', this.makeTypeMenu(CallBack))

        menu.show()
    }

    addBasicMenu(CallBack: CallBack, menu: Menu) {
        const list = [
            { name: 'boolean' },
            { name: 'number' },
            { name: 'string' },
            { name: 'void' }
        ]
        if (this.kind == OwnerKind.Variable) {
            list.pop() // remove type void
        }
        list.forEach(type => {
            menu.add(type.name, label => CallBack(label))
        })
    }

    makeTypeMenu(CallBack: CallBack) {
        const menu = new Menu()
        const list = this.project.checker.getTypeList(this.module)
        list.forEach(type => {
            menu.add(type.name, label => CallBack(label))
        })
        return menu
    }
}

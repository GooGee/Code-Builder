import Menu, { CallBack } from "./Menu"
import { Builder } from "../Builder"

export default class TypeMenu {
    builder: Builder

    constructor(builder: Builder) {
        this.builder = builder
    }

    get project() {
        return this.builder.project!
    }

    get module() {
        return this.builder.module!
    }

    show(CallBack: CallBack, kind: string= 'Property') {
        let menu = new Menu()

        menu.addMenu('Basic', this.makeBasicMenu(CallBack, kind))
        menu.addMenu('Module', this.makeModuleMenu(CallBack))
        menu.addMenu('Type', this.makeTypeMenu(CallBack))

        menu.show()
    }

    makeBasicMenu(CallBack: CallBack, kind: string) {
        let menu = new Menu()
        let list = [
            { name: 'boolean' },
            { name: 'number' },
            { name: 'string' },
            { name: 'void' }
        ]
        if (kind == 'Property') {
            list.pop() // remove type void
        }
        list.forEach(type => {
            menu.add(type.name, lable => CallBack(lable))
        })
        return menu
    }

    makeModuleMenu(CallBack: CallBack) {
        let menu = new Menu()
        let importList = this.module.ImportManager.list
        importList.forEach(type => {
            menu.add(type.name, lable => CallBack(lable))
        })
        return menu
    }

    makeTypeMenu(CallBack: CallBack) {
        let menu = new Menu()
        let list = this.project.getTypeList(this.module)
        list.forEach(type => {
            menu.add(type.name, lable => CallBack(lable))
        })
        return menu
    }
}

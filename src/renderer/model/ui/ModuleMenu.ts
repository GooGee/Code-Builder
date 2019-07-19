import Menu, { CallBack } from "./Menu"
import { Builder } from "../Builder"

export default class ModuleMenu {
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

    show(CallBack: CallBack) {
        const menu = new Menu()

        const list = this.project.ModuleManager.list
        list.forEach(mmm => {
            if (this.module.path == mmm.path) {
                return
            }
            menu.add(mmm.name, label => CallBack(mmm.path))
        })

        menu.addSeparator()

        const aml = this.project.AmbientModuleList
        aml.forEach(mmm => {
            const name = mmm.name.slice(1, -1) // trim quote
            menu.add(name, label => CallBack(label))
        })

        menu.show()
    }
}
import { Builder } from "../Builder"
import Menu from "./Menu"
import Line from "../code/Line"
import LineManager from "../code/LineManager"
import Block from "../code/Block"
import TypeMenu from "./TypeMenu"
import { enter, look, sure } from "./Dialogue"

export default class StatementMenu {
    line: Line
    manager: LineManager
    block: Block
    builder: Builder

    constructor(line: Line, manager: LineManager, block: Block, builder: Builder) {
        this.line = line
        this.manager = manager
        this.block = block
        this.builder = builder
    }

    get project() {
        return this.builder.project!
    }

    get module() {
        return this.builder.module!
    }

    show() {
        let menu = new Menu()
        menu.add('Insert', item => this.insert())
        menu.addSeparator()
        menu.add('Delete', item => this.remove())

        if (this.line.statement) {
            menu.show()
            return
        }

        menu.addSeparator()

        menu.add('Assign', item => {
            this.line.makeAssign()
            this.module.save()
        })

        if (this.block.inLoop) {
            menu.add('Break', item => this.line.makeBreak())
            menu.add('Call', item => {
                this.line.makeCall()
                this.module.save()
            })
            menu.add('Continue', item => this.line.makeContinue())
        } else {
            menu.add('Call', item => {
                this.line.makeCall()
                this.module.save()
            })
        }

        let tm = new TypeMenu(this.builder)
        menu.add('Define', item => tm.show(name => this.makeName(name)))

        menu.add('Each', item => {
            this.line.makeForOf()
            this.module.save()
        })
        menu.add('From', item => {
            this.line.makeFor()
            this.module.save()
        })
        menu.add('If', item => {
            this.line.makeIf()
            this.module.save()
        })
        menu.add('Loop', item => {
            this.line.makeWhile()
            this.module.save()
        })
        menu.add('Return', item => {
            this.line.makeReturn()
            this.module.save()
        })

        if (this.block.inSelect) {
            // go on
        } else {
            menu.add('Select', item => {
                this.line.makeSwitch()
                this.module.save()
            })
        }

        menu.add('Try', item => {
            this.line.makeTry()
            this.module.save()
        })

        menu.show()
    }

    insert() {
        let line = this.manager.make()
        this.manager.insert(line, this.line)
    }

    remove() {
        sure('Are you sure?').then(result => {
            if (result.value) {
                this.manager.remove(this.line)
                this.module.save()
            }
        })
    }

    makeName(typeName: string) {
        let name = typeName.toLowerCase()
        enter('Please enter the name', name).then(result => {
            if (result.value) {
                try {
                    this.line.makeDefine(result.value, typeName)
                    this.module.save()
                } catch (error) {
                    look(error, 400)
                }
            }
        })
    }
}

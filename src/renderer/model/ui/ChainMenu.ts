import Menu from "./Menu"
import { Builder } from '../Builder'
import Chain from "../code/Chain"
import { enter, look, sure } from './Dialogue'
import { PropertyAccessExpression, Expression } from "../code/Expression"

export default class ChainMenu {
    chain: Chain
    builder: Builder

    constructor(chain: Chain, builder: Builder) {
        this.chain = chain
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
        this.addArgument(menu)
        this.addProperty(menu)
        menu.show()
    }

    changeRoot() {
        let menu = new Menu()

        menu.addMenu('Constant', this.makeConstantMenu())
        menu.addMenu('Module', this.makeModuleMenu())
        menu.addMenu('Type', this.makeTypeMenu())
        menu.addMenu('Variable', this.makeVariableMenu())

        menu.show()
    }

    change(expression: PropertyAccessExpression) {
        if (expression.expression) {
            // go on
        } else {
            this.changeRoot()
            return
        }

        let menu = new Menu()

        menu.add('Delete', label => this.remove(expression))

        menu.addSeparator()

        this.changeProperty(expression, menu)

        menu.show()
    }

    addArgument(menu: Menu) {
        let signature = this.project.getCallSignature(this.chain.root)
        if (signature) {
            menu.add('Call', label => {
                this.chain.call(signature!.parameters)
                this.module.save()
            })
        }
    }

    addProperty(menu: Menu) {
        let expression = this.chain.root
        let list = this.project.getPropertyList(expression)
        list.forEach(property => {
            menu.add(property.name, label => {
                this.chain.access(label)
                this.module.save()
            })
        })
    }

    changeProperty(expression: PropertyAccessExpression, menu: Menu) {
        let owner = expression.expression
        let list = this.project.getPropertyList(owner)
        list.forEach(property => {
            menu.add(property.name, label => {
                this.chain.change(label, expression)
                this.module.save()
            })
        })
    }

    input(keyword: string) {
        this.chain.input(keyword)
        this.module.save()
    }

    inputNumber(number: number) {
        this.chain.inputNumber(number)
        this.module.save()
    }

    makeNumber() {
        enter('Please input a number').then(result => {
            if (result.value) {
                try {
                    this.chain.inputNumber(result.value)
                    this.module.save()
                } catch (error) {
                    look(error)
                }
            }
        })
    }

    makeString() {
        enter('Please input something').then(result => {
            if (result.value) {
                this.chain.inputString(result.value)
                this.module.save()
            }
        })
    }

    makeConstantMenu() {
        let menu = new Menu()

        menu.add('Input Number', label => this.makeNumber())
        menu.add('Input String', label => this.makeString())
        menu.addSeparator()

        menu.add('null', label => this.input('null'))
        menu.add('false', label => this.input('false'))
        menu.add('true', label => this.input('true'))
        menu.addSeparator()

        menu.add('-1', label => this.inputNumber(-1))
        menu.add('0', label => this.inputNumber(0))
        menu.add('1', label => this.inputNumber(1))
        menu.addSeparator()

        menu.add("''", label => {
            this.chain.inputString('')
            this.module.save()
        })

        return menu
    }

    makeModuleMenu() {
        let menu = new Menu()
        let importList = this.module.ImportManager.list
        importList.forEach(type => {
            menu.add(type.name, lable => this.start(lable))
        })
        return menu
    }

    makeTypeMenu() {
        let menu = new Menu()
        let list = this.project.getTypeList(this.module)
        list.forEach(type => {
            menu.add(type.name, lable => this.start(lable))
        })
        return menu
    }

    makeVariableMenu() {
        let menu = new Menu()

        menu.add('this', label => this.input('this'))

        if (this.builder.statement) {
            let list = this.project.getVariableList(this.builder.statement)
            // filter list, too many useless items
            let index = list.findIndex(item => item.name == 'NaN')
            list.splice(index)
            list.forEach(vriable => {
                menu.add(vriable.name, lable => this.start(lable))
            })
        }

        return menu
    }

    start(lable: string) {
        this.chain.start(lable)
        this.module.save()
    }

    remove(expression: PropertyAccessExpression) {
        sure('Are you sure?').then(result => {
            if (result.value) {
                this.chain.remove(expression)
                this.module.save()
            }
        })
    }
}

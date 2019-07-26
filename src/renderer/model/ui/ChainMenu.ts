import Menu from "./Menu"
import { Builder } from '../Builder'
import { enter, look, sure } from './Dialogue'
import { PropertyAccessExpression, Expression } from "../code/Expression"
import { Chain } from "../code/Box"

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

    access() {
        const menu = new Menu()

        const owner = this.chain.root

        menu.add('Not', label => {
            this.chain.not()
            this.module.save()
        })

        this.addArgument(owner, menu)

        this.addProperty(owner, menu)

        menu.show()
    }

    change(expression: PropertyAccessExpression) {
        const owner = expression.expression
        if (owner) {
            // go on
        } else {
            this.changeRoot()
            return
        }

        let menu = new Menu()

        menu.add('Delete', label => this.remove(expression))

        menu.addSeparator()

        this.addArgument(owner, menu)

        this.addProperty(owner, menu)

        menu.show()
    }

    changeRoot() {
        let menu = new Menu()

        if (this.chain.canBeConstant) {
            menu.addMenu('Constant', this.makeConstantMenu())
        }
        menu.addMenu('Module', this.makeModuleMenu())
        menu.addMenu('Type', this.makeTypeMenu())

        menu.addSeparator()

        this.addVariable(menu)

        menu.show()
    }

    addArgument(owner: Expression, menu: Menu) {
        let list = this.project.checker.getCallSignatureList(owner.source!)
        list.forEach(signature => {
            const list: string[] = []
            signature.parameters.forEach(parameter => list.push(parameter.name))
            const label = owner.value + ' ( ' + list.join(', ') + ' )'
            menu.add(label, label => {
                this.chain.call(signature.parameters, owner)
                this.module.save()
            })
        })
    }

    addProperty(owner: Expression, menu: Menu) {
        let list = this.project.checker.getPropertyList(owner.source!)
        list.forEach(property => {
            menu.add(property.name, label => {
                this.chain.access(label, owner)
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
        menu.add('NaN', label => this.input('NaN'))
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
            menu.add(type.name, label => this.start(label))
        })
        return menu
    }

    makeTypeMenu() {
        let menu = new Menu()
        let list = this.project.checker.getTypeList(this.module)
        list.forEach(type => {
            menu.add(type.name, label => this.start(label))
        })
        return menu
    }

    addVariable(menu: Menu) {
        menu.add('this', label => this.input('this'))

        if (this.builder.statement) {
            let list = this.project.checker.getVariableList(this.builder.statement.source!)
            // filter list, too many useless items
            let index = list.findIndex(item => item.name == 'NaN')
            list.splice(index)
            list.forEach(vriable => {
                menu.add(vriable.name, label => this.start(label))
            })
        }
    }

    start(label: string) {
        this.chain.start(label)
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

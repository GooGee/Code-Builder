import * as ts from 'typescript'
import NameManager from './NameManager'
import TypeNode from './TypeNode'
import { Parameter } from './Member'

export default class ParameterManager extends NameManager<Parameter> {

    get text() {
        let list = Array<string>()
        this.list.forEach(item => {
            list.push(item.name)
        })
        return list.join(', ')
    }

    load(list: ReadonlyArray<ts.ParameterDeclaration>) {
        list.forEach(node => {
            let ppp = Parameter.load(node)
            this.add(ppp)
        })
    }

    update(list: ReadonlyArray<ts.ParameterDeclaration>) {
        list.forEach(node => {
            let name = node.name as ts.Identifier
            let ppp = this.find(name.text)
            if (ppp) {
                ppp.update(node)
            }
        })
    }

    toNodeArray() {
        let list: ts.ParameterDeclaration[] = []
        this.list.forEach(ppp => {
            list.push(ppp.toNode())
        })
        return list
    }

    make(name: string, type: string) {
        let node = TypeNode.make(type)
        let ppp = new Parameter(name, node)
        return ppp
    }
}

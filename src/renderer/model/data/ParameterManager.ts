import * as ts from 'typescript'
import NameManager from './NameManager'
import TypeBox, { OwnerKind } from './TypeBox'
import { Parameter } from './Member'

export default class ParameterManager extends NameManager<Parameter> {
    inLambda: boolean

    constructor(inLambda: boolean = false) {
        super()
        this.inLambda = inLambda
    }

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
            ppp.hasType = !this.inLambda
            ppp.hasValue = !this.inLambda
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

    make(name: string, list: string[]) {
        const node = TypeBox.make(list, OwnerKind.Variable)
        const ppp = new Parameter(name, node)
        ppp.hasType = !this.inLambda
        ppp.hasValue = !this.inLambda
        return ppp
    }
}

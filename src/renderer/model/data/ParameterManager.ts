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
        const list = Array<string>()
        this.list.forEach(item => {
            list.push(item.name)
        })
        return list.join(', ')
    }

    load(list: ReadonlyArray<ts.ParameterDeclaration>) {
        list.forEach(node => {
            const ppp = Parameter.load(node)
            ppp.hasType = !this.inLambda
            ppp.hasValue = !this.inLambda
            this.add(ppp)
        })
    }

    toNodeArray() {
        const list: ts.ParameterDeclaration[] = []
        this.list.forEach(ppp => {
            list.push(ppp.toNode())
        })
        return list
    }

    make(name: string, list: Array<string>) {
        const node = TypeBox.make(list, OwnerKind.Variable)
        const ppp = new Parameter(name, node)
        ppp.hasType = !this.inLambda
        ppp.hasValue = !this.inLambda
        return ppp
    }
}

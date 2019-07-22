import * as ts from 'typescript'
import Manager from "../Manager"
import TypeBox, { OwnerKind } from './TypeBox'

export default class TypeManager extends Manager<TypeBox> {
    kind: OwnerKind

    constructor(OwnerKind: OwnerKind) {
        super()
        this.kind = OwnerKind
    }

    get text(): string {
        const list: Array<string> = []
        this.list.forEach(item => list.push(item.text))
        return list.join(', ')
    }

    makeExpressionType(list: Array<string>) {
        return TypeBox.makeExpressionType(list)
    }

    load(list?: ReadonlyArray<ts.TypeNode>) {
        if (list) {
            list.forEach(node => {
                const te = TypeBox.load(node, this.kind)
                this.add(te)
            })
        }
    }

    update(list?: ReadonlyArray<ts.TypeNode>) {
        this.clear()
        this.load(list)
    }

    toNodeArray() {
        const list: Array<ts.TypeNode> = []
        this.list.forEach(item => {
            list.push(item.toNode())
        })
        return list
    }
}

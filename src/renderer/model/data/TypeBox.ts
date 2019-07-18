import * as ts from 'typescript'
import TypeNode from "./TypeNode"
import Node from '../Node'

export default class TypeBox implements Node {
    type: TypeNode
    source: ts.TypeNode | null = null

    constructor(type: TypeNode) {
        this.type = type
    }

    get text() {
        return this.type.text
    }

    setType(list: string[]) {
        this.type = TypeNode.from(list)
    }

    static from(list: string[]) {
        const type = TypeNode.from(list)
        const box = new TypeBox(type)
        return box
    }

    static make(name: string) {
        const type = TypeNode.make(name)
        const box = new TypeBox(type)
        return box
    }

    static load(node?: ts.TypeNode) {
        const type = TypeNode.load(node)
        const box = new TypeBox(type)
        if (node) {
            box.source = node
        }
        return box
    }

    update(node: ts.TypeNode) {
        this.source = node
        this.type.update(node)
    }

    toNode() {
        return this.type.toNode()
    }
}

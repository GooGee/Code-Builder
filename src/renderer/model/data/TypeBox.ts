import * as ts from 'typescript'
import TypeNode from "./TypeNode"
import Node from '../Node'

export enum OwnerKind {
    Function,
    Type,
    Variable
}

export default class TypeBox implements Node {
    type: TypeNode
    kind: OwnerKind
    source: ts.TypeNode | null = null

    constructor(type: TypeNode, kind: OwnerKind) {
        this.type = type
        this.kind = kind
    }

    get text() {
        return this.type.text
    }

    setType(list: Array<string>) {
        this.type = TypeNode.make(list)
    }

    static makeExpressionType(list: Array<string>) {
        const eee = TypeNode.makeExpressionType(list)
        const box = new TypeBox(eee, OwnerKind.Type)
        return box
    }

    static make(list: Array<string>, kind: OwnerKind) {
        const type = TypeNode.make(list)
        const box = new TypeBox(type, kind)
        return box
    }

    static load(node: ts.TypeNode, kind: OwnerKind) {
        const type = TypeNode.load(node)
        const box = new TypeBox(type, kind)
        if (node) {
            box.source = node
        }
        return box
    }

    toNode() {
        return this.type.toNode()
    }
}

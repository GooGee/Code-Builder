import * as ts from 'typescript'
import Name from './Name'
import Node from '../Node'
import { TypeExpression } from '../code/Expression'

export default class Heritage extends Name implements Node {
    readonly isImplement: boolean
    readonly type: TypeExpression
    source: ts.HeritageClause | null = null

    constructor(type: TypeExpression, isImplement: boolean) {
        super(type.name)
        this.type = type
        this.isImplement = isImplement
    }

    get name(): string {
        return this._name
    }

    set name(name: string) {
        this._name = name
    }

    get text(): string {
        return this.type.text
    }

    static load(node: ts.HeritageClause) {
        let type: TypeExpression = TypeExpression.load(node.types[0])
        let isImplement = false
        if (node.token == ts.SyntaxKind.ImplementsKeyword) {
            isImplement = true
        }
        let hhh = new Heritage(type, isImplement)
        hhh.source = node
        return hhh
    }

    update(node: ts.HeritageClause) {
        this.source = node
    }

    toNode() {
        return this.type.toNode()
    }
}

import * as ts from 'typescript'
import Node from '../Node'
import TypeManager from './TypeManager'

type HeritageKind = ts.SyntaxKind.ExtendsKeyword | ts.SyntaxKind.ImplementsKeyword

export default class Heritage implements Node {
    readonly isImplement: boolean
    kind: HeritageKind
    readonly TypeManager: TypeManager = new TypeManager
    source: ts.HeritageClause | null = null

    constructor(isImplement: boolean) {
        this.isImplement = isImplement
        this.kind = ts.SyntaxKind.ExtendsKeyword
        if (isImplement) {
            this.kind = ts.SyntaxKind.ImplementsKeyword
        }
    }

    get text(): string {
        return this.TypeManager.text
    }

    make(list: Array<string>) {
        const type = this.TypeManager.makeExpressionType(list)
        return type
    }

    static load(node: ts.HeritageClause) {
        const hhh = new Heritage(node.token == ts.SyntaxKind.ImplementsKeyword)
        hhh.TypeManager.load(node.types)
        hhh.source = node
        return hhh
    }

    update(node: ts.HeritageClause) {
        this.source = node
        this.TypeManager.update(node.types)
    }

    toNode() {
        const list: Array<ts.ExpressionWithTypeArguments> = this.TypeManager.toNodeArray() as any
        const node = ts.createHeritageClause(
            this.kind,
            list
        )
        return node
    }
}

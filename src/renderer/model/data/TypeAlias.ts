import * as ts from 'typescript'
import Name from './Name'
import Node from '../Node'
import TypeBox, { OwnerKind } from './TypeBox'
import ModifierManager from './ModifierManager'

export default class TypeAlias extends Name implements Node {
    readonly modifier: ModifierManager = new ModifierManager
    TypeBox: TypeBox
    source: ts.TypeAliasDeclaration | null = null

    constructor(name: string, TypeBox: TypeBox) {
        super(name)
        this.TypeBox = TypeBox
    }

    get text() {
        const value = this.TypeBox.text
        return `${this.name} = ${value}`
    }

    static load(node: ts.TypeAliasDeclaration) {
        const box = TypeBox.load(node.type, OwnerKind.Variable)
        const ta = new TypeAlias(node.name.text, box)
        return ta
    }

    toNode() {
        const node = ts.createTypeAliasDeclaration(
            undefined,
            this.modifier.toNodeArray(),
            this.name,
            [],
            this.TypeBox.toNode()
        )
        return node
    }
}
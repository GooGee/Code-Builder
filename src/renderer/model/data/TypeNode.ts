import * as ts from 'typescript'
import Node from '../Node'
import TypeBox, { OwnerKind } from './TypeBox'
import TypeManager from './TypeManager'
import Chain from '../code/Chain'
import TypeName, { QualifiedName, Identifier } from './TypeName'
import { BracketKind } from '../Manager'

export default abstract class TypeNode implements Node {
    isArray = false
    isExpression = false
    isKeyWord = false
    isReference = false
    isUnion = false
    abstract source: ts.TypeNode | null
    abstract text: string
    abstract toNode(): ts.TypeNode

    static make(list: Array<string>) {
        if (list.length > 1) {
            const name = TypeName.make(list)
            return new ReferenceType(name)
        }

        const name = list[0]
        const kw = KeyWordType.findByName(name)
        if (kw) {
            return new KeyWordType(kw.kind)
        }

        return new ReferenceType(new Identifier(name))
    }

    static makeExpressionType(list: Array<string>) {
        const type = new ExpressionType
        type.chain.from(list)
        return type
    }

    static load(node?: ts.TypeNode): TypeNode {
        if (!node) {
            return new KeyWordType(ts.SyntaxKind.AnyKeyword)
        }

        if (ts.isArrayTypeNode(node)) {
            return ArrayType.load(node)
        }

        if (ts.isExpressionWithTypeArguments(node)) {
            return ExpressionType.load(node)
        }

        if (ts.isTypeReferenceNode(node)) {
            return ReferenceType.load(node)
        }

        if (ts.isUnionTypeNode(node)) {
            return UnionType.load(node)
        }

        let keyword = node as ts.KeywordTypeNode
        return KeyWordType.load(keyword)
    }
}

/**
 * predicate lambda
 */
export class ArrayType extends TypeNode {
    isArray = true
    TypeBox: TypeBox
    source: ts.ArrayTypeNode | null = null

    constructor(type: TypeBox) {
        super()
        this.TypeBox = type
    }

    get type() {
        return this.TypeBox
    }

    get text() {
        return this.TypeBox.text
    }

    static load(node: ts.ArrayTypeNode) {
        const type = TypeBox.load(node.elementType, OwnerKind.Function)
        const ttt = new ArrayType(type)
        ttt.source = node
        return ttt
    }

    toNode() {
        let node = ts.createArrayTypeNode(
            this.TypeBox.toNode()
        )
        return node
    }
}

export class ExpressionType extends TypeNode {
    isExpression = true
    chain: Chain = new Chain
    readonly TypeManager: TypeManager = new TypeManager(OwnerKind.Type)
    source: ts.ExpressionWithTypeArguments | null = null

    get text(): string {
        return this.chain.text
    }

    static load(node: ts.ExpressionWithTypeArguments) {
        const te = new ExpressionType
        te.source = node
        te.chain.load(node.expression)
        te.TypeManager.load(node.typeArguments)
        return te
    }

    toNode() {
        return ts.createExpressionWithTypeArguments(
            this.TypeManager.toNodeArray(),
            this.chain.toNode()
        )
    }
}

export class KeyWordType extends TypeNode {
    isKeyWord = true
    private _name: string
    kind: ts.KeywordSyntaxKind
    source: ts.KeywordTypeNode | null = null

    constructor(kind: ts.KeywordSyntaxKind) {
        super()
        this.kind = kind
        let kw = KeyWordType.findByKind(kind)
        this._name = kw!.text
    }

    get name() {
        return this._name
    }

    set name(name: string) {
        this._name = name
        let kw = KeyWordType.findByName(name)
        if (kw) {
            this.kind = kw.kind
        }
    }

    get text() {
        return this.name
    }

    static findByName(name: string) {
        return KeyWordList.find(kw => kw.text == name)
    }

    static findByKind(kind: ts.KeywordSyntaxKind) {
        return KeyWordList.find(kw => kw.kind == kind)
    }

    static load(node: ts.KeywordTypeNode) {
        let kw = KeyWordType.findByKind(node.kind)
        if (kw) {
            let name = new KeyWordType(kw.kind)
            name.source = node
            return name
        }
        throw 'Unknown KeyWord Type'
    }

    toNode() {
        let node = ts.createKeywordTypeNode(this.kind as any)
        return node
    }
}

export class ReferenceType extends TypeNode {
    isReference = true
    type: Identifier | QualifiedName
    readonly ArgumentManager: TypeManager = new TypeManager(OwnerKind.Variable)
    source: ts.TypeReferenceNode | null = null

    constructor(type: Identifier | QualifiedName) {
        super()
        this.type = type
    }

    get text() {
        let text = this.type.text
        if (this.ArgumentManager.list.length) {
            text = `${text} < ${this.ArgumentManager.text} >`
        }
        return text
    }

    toArray() {
        const list: Array<string> = []
        let ttt = this.type
        while (ttt instanceof QualifiedName) {
            list.push(ttt.name)
            ttt = ttt.left
        }
        list.push(ttt.name)
        return list
    }

    access(name: string) {
        this.type = new QualifiedName(this.type, new Identifier(name))
    }

    addGeneric(length: number) {
        this.ArgumentManager.clear()
        for (let index = 0; index < length; index++) {
            const ttt = TypeBox.make(['string'], OwnerKind.Variable)
            this.ArgumentManager.add(ttt)
        }
    }

    static load(node: ts.TypeReferenceNode) {
        const type = TypeName.load(node.typeName)
        const rt = new ReferenceType(type)
        rt.source = node
        rt.ArgumentManager.load(node.typeArguments)
        return rt
    }

    toNode() {
        let list = undefined
        if (this.ArgumentManager.list) {
            list = []
            this.ArgumentManager.list.forEach(item => {
                list.push(item.toNode())
            })
        }

        let node = ts.createTypeReferenceNode(
            this.type.toNode(),
            list
        )
        return node
    }
}

export class UnionType extends TypeNode {
    isUnion: boolean = true
    readonly TypeManager: TypeManager = new TypeManager(OwnerKind.Variable)
    source: ts.UnionTypeNode | null = null

    get text() {
        return this.TypeManager.getText(' | ', BracketKind.Pointy)
    }

    static load(node: ts.UnionTypeNode) {
        const type = new UnionType
        type.TypeManager.load(node.types)
        return type
    }

    toNode() {
        const node = ts.createUnionTypeNode(
            this.TypeManager.toNodeArray()
        )
        return node
    }
}

type KeyWordKind = ts.SyntaxKind.AnyKeyword | ts.SyntaxKind.UnknownKeyword | ts.SyntaxKind.NumberKeyword | ts.SyntaxKind.BigIntKeyword | ts.SyntaxKind.ObjectKeyword | ts.SyntaxKind.BooleanKeyword | ts.SyntaxKind.StringKeyword | ts.SyntaxKind.SymbolKeyword | ts.SyntaxKind.ThisKeyword | ts.SyntaxKind.VoidKeyword | ts.SyntaxKind.UndefinedKeyword | ts.SyntaxKind.NullKeyword | ts.SyntaxKind.NeverKeyword

class KeyWordMap {
    kind: KeyWordKind
    text: string

    constructor(kind: KeyWordKind, text: string) {
        this.kind = kind
        this.text = text
    }
}

export const KeyWordList = Array.from([
    new KeyWordMap(ts.SyntaxKind.AnyKeyword, 'any'),
    new KeyWordMap(ts.SyntaxKind.UnknownKeyword, 'Unknown'),
    new KeyWordMap(ts.SyntaxKind.NumberKeyword, 'number'),
    new KeyWordMap(ts.SyntaxKind.BigIntKeyword, 'BigInt'),
    new KeyWordMap(ts.SyntaxKind.ObjectKeyword, 'Object'),
    new KeyWordMap(ts.SyntaxKind.BooleanKeyword, 'boolean'),
    new KeyWordMap(ts.SyntaxKind.StringKeyword, 'string'),
    new KeyWordMap(ts.SyntaxKind.SymbolKeyword, 'Symbol'),
    new KeyWordMap(ts.SyntaxKind.ThisKeyword, 'This'),
    new KeyWordMap(ts.SyntaxKind.VoidKeyword, 'void'),
    new KeyWordMap(ts.SyntaxKind.UndefinedKeyword, 'Undefined'),
    new KeyWordMap(ts.SyntaxKind.NullKeyword, 'null'),
    new KeyWordMap(ts.SyntaxKind.NeverKeyword, 'Never'),
])

import * as ts from 'typescript'
import Manager from '../Manager'
import Project from '../Project'
import Node from '../Node'

export default class TypeChain {
    type: QualifiedName | Identifier | KeyWord
    readonly ArgumentManager = new Manager<TypeChain>()
    source: ts.TypeNode | null = null

    constructor(type: QualifiedName | Identifier | KeyWord) {
        this.type = type
    }

    /**
     * ts.QualifiedName
     * @param name 
     */
    access(name: string) {
        let type = this.type as any
        this.type = new QualifiedName(type, name)
    }

    setType(name: string) {
        this.type = TypeChain.makeType(name)
    }

    get text() {
        let text = this.type.text
        if (this.ArgumentManager.list.length) {
            let list = new Array<string>()
            this.ArgumentManager.list.forEach(item => list.push(item.text))
            let sss = list.join(', ')
            text = `${text} < ${sss} >`
        }
        return text
    }

    addGeneric(length: number) {
        this.ArgumentManager.clear()
        for (let index = 0; index < length; index++) {
            const ttt = TypeChain.make('string')
            this.ArgumentManager.add(ttt)
        }
    }

    updateArgument(node: ts.TypeNode) {
        this.ArgumentManager.clear()
        if (ts.isTypeReferenceNode(node)) {
            const list = node.typeArguments
            if (list) {
                list.forEach(argument => {
                    this.ArgumentManager.add(TypeChain.load(argument))
                })
            }
        }
    }

    static makeType(name: string) {
        let kind = KeyWordList.find(kw => kw.text == name)
        if (kind) {
            return new KeyWord(kind.kind)
        }

        return new Identifier(name)
    }

    static make(name: string) {
        return new TypeChain(TypeChain.makeType(name))
    }

    static from(node: ts.TypeNode) {
        if (ts.isTypeReferenceNode(node)) {
            let type = node.typeName
            if (type.kind == ts.SyntaxKind.Identifier) {
                return Identifier.load(type)
            } else {
                return QualifiedName.load(type)
            }
        }

        let keyword = node as ts.KeywordTypeNode
        return KeyWord.load(keyword)
    }

    static load(node?: ts.TypeNode) {
        if (!node) {
            return TypeChain.make('any')
        }

        let nnn = new TypeChain(TypeChain.from(node))
        nnn.source = node
        nnn.updateArgument(node)
        return nnn
    }

    update(node: ts.TypeNode) {
        this.source = node
        this.type = TypeChain.from(node)
        this.updateArgument(node)
    }

    toNode() {
        if (this.type instanceof KeyWord) {
            return this.type.toNode()
        }

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

export abstract class TypeName implements Node {
    isSingle: boolean = false
    abstract name: string
    abstract text: string
    abstract source: ts.Node | null
    abstract toNode(): ts.Node
}

export class Identifier extends TypeName {
    readonly isSingle: boolean = true
    name: string
    source: ts.Identifier | null = null

    constructor(name: string) {
        super()
        this.name = name
    }

    get text() {
        return this.name
    }

    static load(node: ts.Identifier) {
        let name = new Identifier(node.text)
        name.source = node
        return name
    }

    update(node: ts.Identifier) {
        this.source = node
    }

    toNode() {
        let node = ts.createIdentifier(this.name)
        return node
    }
}

export class KeyWord extends TypeName {
    readonly isSingle: boolean = true
    private _name: string
    kind: ts.KeywordSyntaxKind
    source: ts.KeywordTypeNode | null = null

    constructor(kind: ts.KeywordSyntaxKind) {
        super()
        this.kind = kind
        let kw = KeyWordList.find(kw => kw.kind == kind)
        this._name = kw!.text
    }

    get name() {
        return this._name
    }

    set name(name: string) {
        this._name = name
        let kind = KeyWordList.find(kw => kw.text == name)
        if (kind) {
            this.kind = kind.kind
        }
    }

    get text() {
        return this.name
    }

    static load(node: ts.KeywordTypeNode) {
        let kw = KeyWordList.find(kw => kw.kind == node.kind)
        if (kw) {
            let name = new KeyWord(kw.kind)
            name.source = node
            return name
        }
        throw 'Unknown KeyWord Type'
    }

    update(node: ts.KeywordTypeNode) {
        this.source = node
    }

    toNode() {
        let node = ts.createKeywordTypeNode(this.kind as any)
        return node
    }
}

export class QualifiedName extends TypeName {
    left: QualifiedName | Identifier
    right: string
    source: ts.QualifiedName | null = null

    constructor(left: QualifiedName | Identifier, right: string) {
        super()
        this.left = left
        this.right = right
    }

    get name() {
        return this.right
    }

    get text() {
        let left = this.left.text as string
        return `${left} ${Project.PointSign} ${this.right}`
    }

    static load(node: ts.QualifiedName): QualifiedName {
        let left: QualifiedName | Identifier
        if (node.left.kind == ts.SyntaxKind.Identifier) {
            left = new Identifier(node.left.text)
        } else {
            left = QualifiedName.load(node.left)
        }
        let right = node.right as ts.Identifier
        let name = new QualifiedName(left, right.text)
        name.source = node
        return name
    }

    update(node: ts.QualifiedName) {
        this.source = node
        if (this.left instanceof Identifier) {
            this.left.update(node.left as ts.Identifier)
        } else {
            this.left.update(node.left as ts.QualifiedName)
        }
    }

    toNode() {
        let node = ts.createQualifiedName(
            this.left.toNode(),
            this.right
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

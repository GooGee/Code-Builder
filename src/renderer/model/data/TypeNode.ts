import * as ts from 'typescript'
import Manager from '../Manager'
import Project from '../Project'
import Node from '../Node'

export default abstract class TypeNode implements Node {
    isArray = false
    isKeyWord = false
    isReference = false
    abstract source: ts.TypeNode | null
    abstract text: string
    abstract update(node: ts.TypeNode): void
    abstract toNode(): ts.TypeNode

    static from(list: string[]) {
        if (list.length <= 1) {
            return TypeNode.make(list[0])
        }

        let left: Identifier | QualifiedName = new Identifier(list[0])
        for (let index = 1; index < list.length; index++) {
            const right = new Identifier(list[index])
            left = new QualifiedName(left, right)
        }
        return new ReferenceType(left)
    }

    static make(name: string) {
        const kw = KeyWordType.findByName(name)
        if (kw) {
            return new KeyWordType(kw.kind)
        }

        return new ReferenceType(new Identifier(name))
    }

    static load(node?: ts.TypeNode): ArrayType | KeyWordType | ReferenceType {
        if (!node) {
            return new KeyWordType(ts.SyntaxKind.AnyKeyword)
        }

        if (ts.isTypeReferenceNode(node)) {
            return ReferenceType.load(node)
        }

        if (ts.isArrayTypeNode(node)) {
            return ArrayType.load(node)
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
    elementType: TypeNode
    source: ts.ArrayTypeNode | null = null

    constructor(type: TypeNode) {
        super()
        this.elementType = type
    }

    get type() {
        return this.elementType
    }

    get text() {
        return this.elementType.text
    }

    static load(node: ts.ArrayTypeNode) {
        const type = TypeNode.load(node.elementType)
        const ttt = new ArrayType(type)
        ttt.source = node
        return ttt
    }

    update(node: ts.ArrayTypeNode) {
        this.source = node
        this.elementType.update(node.elementType)
    }

    toNode() {
        let node = ts.createArrayTypeNode(
            this.elementType.toNode()
        )
        return node
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

    update(node: ts.KeywordTypeNode) {
        this.source = node
        this.kind = node.kind
    }

    toNode() {
        let node = ts.createKeywordTypeNode(this.kind as any)
        return node
    }
}

export class ReferenceType extends TypeNode {
    isReference = true
    type: Identifier | QualifiedName
    readonly ArgumentManager = new Manager<TypeNode>()
    source: ts.TypeReferenceNode | null = null

    constructor(type: Identifier | QualifiedName) {
        super()
        this.type = type
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

    access(name: string) {
        this.type = new QualifiedName(this.type, new Identifier(name))
    }

    addGeneric(length: number) {
        this.ArgumentManager.clear()
        for (let index = 0; index < length; index++) {
            const ttt = TypeNode.make('string')
            this.ArgumentManager.add(ttt)
        }
    }

    updateArgument(node: ts.TypeReferenceNode) {
        this.ArgumentManager.clear()
        const list = node.typeArguments
        if (list) {
            list.forEach(argument => {
                this.ArgumentManager.add(TypeNode.load(argument))
            })
        }
    }

    static load(node: ts.TypeReferenceNode) {
        const type = TypeName.load(node.typeName)
        const rt = new ReferenceType(type)
        rt.updateArgument(node)
        return rt
    }

    update(node: ts.TypeReferenceNode) {
        this.source = node
        this.type = TypeName.load(node.typeName)
        this.updateArgument(node)
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

export abstract class TypeName implements Node {
    isSingle: boolean = false
    abstract name: string
    abstract text: string
    abstract source: ts.Node | null
    abstract toNode(): ts.Node

    static load(node: ts.EntityName) {
        if (ts.isIdentifier(node)) {
            return Identifier.load(node)
        } else {
            return QualifiedName.load(node)
        }
    }
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

export class QualifiedName extends TypeName {
    left: QualifiedName | Identifier
    right: Identifier
    source: ts.QualifiedName | null = null

    constructor(left: QualifiedName | Identifier, right: Identifier) {
        super()
        this.left = left
        this.right = right
    }

    get name() {
        return this.right.text
    }

    get text() {
        let left: string = this.left.text
        let right: string = this.right.text
        return `${left} ${Project.PointSign} ${right}`
    }

    access(name: string) {
        this.right = new Identifier(name)
    }

    static load(node: ts.QualifiedName): QualifiedName {
        let left: QualifiedName | Identifier
        if (node.left.kind == ts.SyntaxKind.Identifier) {
            left = Identifier.load(node.left)
        } else {
            left = QualifiedName.load(node.left)
        }
        let right = Identifier.load(node.right)
        let name = new QualifiedName(left, right)
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
            this.right.toNode()
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

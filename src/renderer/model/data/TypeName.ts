import * as ts from 'typescript'
import Project from '../Project'
import Node from '../Node'

export default abstract class TypeName implements Node {
    isSingle: boolean = false
    abstract name: string
    abstract text: string
    abstract source: ts.Node | null
    abstract toNode(): ts.Node

    static make(list: Array<string>) {
        if (list.length == 0) {
            throw 'Error in making Expression'
        }

        let first = true
        let left: QualifiedName | Identifier
        list.forEach(name => {
            if (first) {
                first = false
                left = new Identifier(name)
            } else {
                const right = new Identifier(name)
                left = new QualifiedName(left, right)
            }
        })
        return left!
    }

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

    toNode() {
        let node = ts.createQualifiedName(
            this.left.toNode(),
            this.right.toNode()
        )
        return node
    }
}

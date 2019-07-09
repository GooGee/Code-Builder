import * as ts from 'typescript'
import Name from './Name'
import ModifierManager from './ModifierManager'
import Module from './Module'
import Node from '../Node'

export default class Import extends Name implements Node {
    readonly modifier: ModifierManager = new ModifierManager
    readonly path: string
    source: ts.ImportDeclaration | null = null
    nsi: ts.NamespaceImport | null = null

    constructor(path: string) {
        super(Module.BaseName(path))
        this.path = path
    }

    static load(node: ts.ImportDeclaration) {
        let sl = node.moduleSpecifier as ts.StringLiteral
        let path = sl.text
        let item = new Import(path)
        item.source = node
        item.modifier.load(node.modifiers)

        item.nsi = node.importClause!.namedBindings as ts.NamespaceImport
        item.name = item.nsi.name.text

        return item
    }

    update(node: ts.ImportDeclaration) {
        this.source = node
    }

    toNode() {
        let iii = ts.createIdentifier(this.name)
        let ic = ts.createImportClause(undefined, ts.createNamespaceImport(iii))
        let node = ts.createImportDeclaration(
            undefined,
            this.modifier.toNodeArray(),
            ic,
            ts.createLiteral(this.path)
        )
        return node
    }

}

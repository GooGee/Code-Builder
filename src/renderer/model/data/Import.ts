import * as ts from 'typescript'
import Name from './Name'
import ModifierManager from './ModifierManager'
import Node from '../Node'

export default class Import extends Name implements Node {
    readonly modifier: ModifierManager = new ModifierManager
    readonly path: string
    clause: ImportClause
    source: ts.ImportDeclaration | null = null

    constructor(path: string, clause: ImportClause) {
        super(clause.name)
        this.path = path
        this.clause = clause
    }

    static load(node: ts.ImportDeclaration) {
        const sl = node.moduleSpecifier as ts.StringLiteral
        const path = sl.text
        const clause = ImportClause.load(node.importClause!)
        const item = new Import(path, clause)
        item.source = node
        item.modifier.load(node.modifiers)

        return item
    }

    update(node: ts.ImportDeclaration) {
        this.source = node
        this.clause.update(node.importClause!)
    }

    toNode() {
        const node = ts.createImportDeclaration(
            undefined,
            this.modifier.toNodeArray(),
            this.clause.toNode(),
            ts.createLiteral(this.path)
        )
        return node
    }

}

export class ImportClause implements Node {
    name: string
    source: ts.ImportClause | null = null

    constructor(name: string) {
        this.name = name
    }

    static load(node: ts.ImportClause) {
        const nsi = node.namedBindings as ts.NamespaceImport
        const clause = new ImportClause(nsi.name.text)
        clause.source = node
        return clause
    }

    update(node: ts.ImportClause) {
        this.source = node
    }

    toNode() {
        const iii = ts.createIdentifier(this.name)
        const node = ts.createImportClause(
            undefined,
            ts.createNamespaceImport(iii)
        )
        return node
    }
}

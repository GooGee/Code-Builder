import * as ts from 'typescript'
import Import, { ImportClause } from '@/model/data/Import'

const name = 'ts'
let iii = null

test(`load`, () => {
    const clause = ts.createImportClause(
        undefined,
        ts.createNamespaceImport(ts.createIdentifier(name))
    )
    const node = ts.createImportDeclaration(
        undefined,
        [],
        clause,
        ts.createLiteral('typescript')
    )
    iii = Import.load(node)
    expect(iii.name).toEqual(name)
})

test(`toNode`, () => {
    const node = iii.toNode()
    const nsi = node.importClause.namedBindings
    expect(nsi.name.text).toEqual(name)
})


let clause = null

test(`load ImportClause`, () => {
    const node = ts.createImportClause(
        undefined,
        ts.createNamespaceImport(ts.createIdentifier(name))
    )
    clause = ImportClause.load(node)
    expect(clause.name).toEqual(name)
})

test(`ImportClause toNode`, () => {
    const node = clause.toNode()
    expect(node.namedBindings.name.text).toEqual(name)
})

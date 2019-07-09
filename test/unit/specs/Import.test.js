import * as ts from 'typescript'
import Import from '@/model/data/Import'

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

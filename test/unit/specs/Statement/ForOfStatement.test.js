import * as ts from 'typescript'
import { ForOfStatement } from '@/model/code/Statement'

let statement = null

test(`load`, () => {
    const name = 'item'
    const variable = ts.createVariableDeclaration(
        name,
        ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
    )
    const vdl = ts.createVariableDeclarationList(
        [variable],
        ts.NodeFlags.Let
    )
    const node = ts.createForOf(
        undefined,
        vdl,
        ts.createIdentifier('list'),
        ts.createBlock([])
    )
    statement = ForOfStatement.load(node)
    expect(statement.item.name).toEqual(name)
})

test(`toNode`, () => {
    const node = statement.toNode()
    expect(node.kind).toEqual(ts.SyntaxKind.ForOfStatement)
})

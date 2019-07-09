import * as ts from 'typescript'
import { VariableStatement } from '@/model/code/Statement'

let statement = null

test(`load`, () => {
    const name = 'age'
    const variable = ts.createVariableDeclaration(
        name,
        ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
        ts.createNumericLiteral(11)
    )
    const vdl = ts.createVariableDeclarationList(
        [variable],
        ts.NodeFlags.Let
    )
    const node = ts.createVariableStatement(
        [],
        vdl
    )
    statement = VariableStatement.load(node)
    expect(statement.variable.name).toEqual(name)
})

test(`toNode`, () => {
    const node = statement.toNode()
    expect(node.kind).toEqual(ts.SyntaxKind.VariableStatement)
})

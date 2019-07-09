import * as ts from 'typescript'
import { ForStatement } from '@/model/code/Statement'

let statement = null

test(`load`, () => {
    const name = 'index'
    const variable = ts.createVariableDeclaration(
        name,
        ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
        ts.createNumericLiteral(0)
    )
    const vdl = ts.createVariableDeclarationList(
        [variable],
        ts.NodeFlags.Let
    )
    const condition = ts.createBinary(
        ts.createIdentifier(name),
        ts.SyntaxKind.LessThanToken,
        ts.createNumericLiteral('9')
    )
    const incrementor = ts.createBinary(
        ts.createIdentifier(name),
        ts.SyntaxKind.PlusEqualsToken,
        ts.createNumericLiteral('1')
    )
    const node = ts.createFor(
        vdl,
        condition,
        incrementor,
        ts.createBlock([])
    )
    statement = ForStatement.load(node)
    expect(statement.index.name).toEqual(name)
})

test(`toNode`, () => {
    const node = statement.toNode()
    expect(node.kind).toEqual(ts.SyntaxKind.ForStatement)
})

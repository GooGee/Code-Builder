import * as ts from 'typescript'
import { TryStatement } from '@/model/code/Statement'

let statement = null

test(`load`, () => {
    const name = 'error'
    const variable = ts.createVariableDeclaration(
        name
    )
    const clause = ts.createCatchClause(
        variable,
        ts.createBlock([])
    )
    const node = ts.createTry(
        ts.createBlock([]),
        clause,
        ts.createBlock([])
    )
    statement = TryStatement.load(node)
    expect(statement.clause.variable.name).toEqual(name)
})

test(`toNode`, () => {
    const node = statement.toNode()
    expect(node.kind).toEqual(ts.SyntaxKind.TryStatement)
})

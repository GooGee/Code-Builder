import * as ts from 'typescript'
import { ExpressionStatement } from '@/model/code/Statement'

let statement = null

test(`load`, () => {
    const name = 'alert'
    const node = ts.createExpressionStatement(
        ts.createIdentifier(name)
    )
    statement = ExpressionStatement.load(node)
    expect(statement.box.text).toEqual(name)
})

test(`toNode`, () => {
    const node = statement.toNode()
    expect(node.kind).toEqual(ts.SyntaxKind.ExpressionStatement)
})

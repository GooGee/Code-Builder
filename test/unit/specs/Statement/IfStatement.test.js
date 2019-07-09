import * as ts from 'typescript'
import { IfStatement } from '@/model/code/Statement'

let statement = null

test(`load`, () => {
    const name = 'found'
    const node = ts.createIf(
        ts.createIdentifier(name),
        ts.createBlock([]),
        undefined
    )
    statement = IfStatement.load(node)
    expect(statement.box.text).toEqual(name)
})

test(`toNode`, () => {
    const node = statement.toNode()
    expect(node.kind).toEqual(ts.SyntaxKind.IfStatement)
})

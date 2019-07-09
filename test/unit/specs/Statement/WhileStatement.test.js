import * as ts from 'typescript'
import { WhileStatement } from '@/model/code/Statement'

let statement = null

test(`load`, () => {
    const name = 'found'
    const node = ts.createWhile(
        ts.createIdentifier(name),
        ts.createBlock([])
    )
    statement = WhileStatement.load(node)
    expect(statement.box.chain.root.text).toEqual(name)
})

test(`toNode`, () => {
    const node = statement.toNode()
    expect(node.kind).toEqual(ts.SyntaxKind.WhileStatement)
})

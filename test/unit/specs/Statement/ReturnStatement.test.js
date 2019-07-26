import * as ts from 'typescript'
import { ReturnStatement } from '@/model/code/Statement'

let statement = null

test(`load`, () => {
    const node = ts.createReturn(
        ts.createTrue()
    )
    statement = ReturnStatement.load(node)
    expect(statement.box.BoxItem.root.text).toEqual('true')
})

test(`toNode`, () => {
    const node = statement.toNode()
    expect(node.kind).toEqual(ts.SyntaxKind.ReturnStatement)
})

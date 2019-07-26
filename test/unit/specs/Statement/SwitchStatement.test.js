import * as ts from 'typescript'
import { SwitchStatement } from '@/model/code/Statement'

let statement = null

test(`load`, () => {
    const name = 'kind'
    const node = ts.createSwitch(
        ts.createIdentifier(name),
        ts.createCaseBlock([])
    )
    statement = SwitchStatement.load(node)
    expect(statement.box.BoxItem.root.value).toEqual(name)
})

test(`toNode`, () => {
    const node = statement.toNode()
    expect(node.kind).toEqual(ts.SyntaxKind.SwitchStatement)
})

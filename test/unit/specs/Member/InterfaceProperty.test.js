import * as ts from 'typescript'
import { InterfaceProperty } from '@/model/data/Member'

let member = null

test(`load`, () => {
    const name = 'name'
    const node = ts.createPropertySignature(
        [],
        name,
        undefined,
        ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
        undefined
    )
    member = InterfaceProperty.load(node)
    expect(member.name).toEqual(name)
})

test(`toNode`, () => {
    const node = member.toNode()
    expect(node.kind).toEqual(ts.SyntaxKind.PropertySignature)
})

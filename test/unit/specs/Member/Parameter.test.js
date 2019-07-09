import * as ts from 'typescript'
import { Parameter } from '@/model/data/Member'

let member = null

test(`load`, () => {
    const name = 'name'
    const node = ts.createParameter(
        undefined,
        [],
        undefined,
        name,
        undefined,
        ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
        undefined
    )
    member = Parameter.load(node)
    expect(member.name).toEqual(name)
})

test(`toNode`, () => {
    const node = member.toNode()
    expect(node.kind).toEqual(ts.SyntaxKind.Parameter)
})

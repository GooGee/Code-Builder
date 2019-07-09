import * as ts from 'typescript'
import { InterfaceMethod } from '@/model/data/Member'

let member = null

test(`load`, () => {
    const name = 'say'
    const node = ts.createMethodSignature(
        undefined,
        [],
        ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
        name,
        undefined
    )
    member = InterfaceMethod.load(node)
    expect(member.name).toEqual(name)
})

test(`toNode`, () => {
    const node = member.toNode()
    expect(node.kind).toEqual(ts.SyntaxKind.MethodSignature)
})

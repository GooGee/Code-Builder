import * as ts from 'typescript'
import { ClassMethod } from '@/model/data/Member'

let member = null

test(`load`, () => {
    const name = 'say'
    const node = ts.createMethod(
        undefined,
        [],
        undefined,
        name,
        undefined,
        undefined,
        [],
        ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
        ts.createBlock([])
    )
    member = ClassMethod.load(node)
    expect(member.name).toEqual(name)
})

test(`toNode`, () => {
    const node = member.toNode()
    expect(node.kind).toEqual(ts.SyntaxKind.MethodDeclaration)
})

import * as ts from 'typescript'
import { ClassProperty } from '@/model/data/Member'

let member = null

test(`load`, () => {
    const name = 'name'
    const node = ts.createProperty(
        undefined,
        [],
        name,
        undefined,
        ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
        undefined
    )
    member = ClassProperty.load(node)
    expect(member.name).toEqual(name)
})

test(`toNode`, () => {
    const node = member.toNode()
    expect(node.kind).toEqual(ts.SyntaxKind.PropertyDeclaration)
})

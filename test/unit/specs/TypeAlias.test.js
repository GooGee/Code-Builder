import * as ts from 'typescript'
import TypeAlias from '@/model/data/TypeAlias'

const name = 'Item'
let type = null

test(`load`, () => {
    const list = [
        ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
        ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
    ]
    const union = ts.createUnionTypeNode(list)
    const node = ts.createTypeAliasDeclaration(
        undefined,
        [],
        name,
        [],
        union
    )
    type = TypeAlias.load(node)
    expect(type.name).toEqual(name)
})

test(`toNode`, () => {
    const node = type.toNode()
    expect(node.name.text).toEqual(name)
})

import * as ts from 'typescript'
import TypeNode from '@/model/data/TypeNode'

const name = 'Array'
let ttt = null

test(`load`, () => {
    const argument = ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
    const node = ts.createTypeReferenceNode(
        name,
        [argument]
    )
    ttt = TypeNode.load(node)
    expect(ttt.type.name).toEqual(name)
})

test(`toNode`, () => {
    const node = ttt.toNode()
    expect(node.typeName.text).toEqual(name)
})

import * as ts from 'typescript'
import TypeNode from '@/model/data/TypeNode'

const kind = ts.SyntaxKind.AnyKeyword
let ttt = null

test(`load`, () => {
    const node = ts.createArrayTypeNode(
        ts.createKeywordTypeNode(kind)
    )
    ttt = TypeNode.load(node)
    expect(ttt.elementType.type.kind).toEqual(kind)
})

test(`toNode`, () => {
    const node = ttt.toNode()
    expect(node.elementType.kind).toEqual(kind)
})

import * as ts from 'typescript'
import TypeNode from '@/model/data/TypeNode'

const kind = ts.SyntaxKind.AnyKeyword
let ttt = null

test(`load`, () => {
    const node = ts.createKeywordTypeNode(kind)
    ttt = TypeNode.load(node)
    expect(ttt.kind).toEqual(kind)
})

test(`toNode`, () => {
    const node = ttt.toNode()
    expect(node.kind).toEqual(kind)
})

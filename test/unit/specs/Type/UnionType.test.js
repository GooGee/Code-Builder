import * as ts from 'typescript'
import TypeNode from '@/model/data/TypeNode'

let ttt = null
const list = [
    ts.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
    ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
]

test(`load`, () => {
    const node = ts.createUnionTypeNode(
        list
    )
    ttt = TypeNode.load(node)
    expect(ttt.TypeManager.list.length).toEqual(list.length)
})

test(`toNode`, () => {
    const node = ttt.toNode()
    expect(node.types.length).toEqual(list.length)
})

import * as ts from 'typescript'
import Heritage from '@/model/data/Heritage'

const name = 'List'
let heritage = null

test(`load`, () => {
    const type = ts.createExpressionWithTypeArguments(
        undefined,
        ts.createIdentifier(name)
    )
    const node = ts.createHeritageClause(
        ts.SyntaxKind.ExtendsKeyword,
        [type]
    )
    heritage = Heritage.load(node)
    expect(heritage.TypeManager.list.length).toEqual(1)
})

test(`toNode`, () => {
    const node = heritage.toNode()
    expect(node.token).toEqual(ts.SyntaxKind.ExtendsKeyword)
})

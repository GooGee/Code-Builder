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
    expect(heritage.type.name).toEqual(name)
})

test(`toNode`, () => {
    const node = heritage.toNode()
    expect(node.expression.text).toEqual(name)
})

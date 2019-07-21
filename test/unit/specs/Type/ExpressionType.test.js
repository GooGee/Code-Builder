import * as ts from 'typescript'
import { ExpressionType } from '@/model/data/TypeNode'

const name = 'Item'
let ttt = null

test(`load`, () => {
    const node = ts.createExpressionWithTypeArguments(
        [ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)],
        ts.createIdentifier(name)
    )
    ttt = ExpressionType.load(node)
    expect(ttt.chain.text).toEqual(name)
})

test(`toNode`, () => {
    const node = ttt.toNode()
    expect(node.expression.text).toEqual(name)
})

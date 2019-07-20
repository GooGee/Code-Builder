import * as ts from 'typescript'
import { ExpressionType } from '@/model/data/TypeNode'

const name = 'Item'
let expression = null

test(`load`, () => {
    const node = ts.createExpressionWithTypeArguments(
        [ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)],
        ts.createIdentifier(name)
    )
    expression = ExpressionType.load(node)
    expect(expression.name).toEqual(name)
})

test(`toNode`, () => {
    const node = expression.toNode()
    expect(node.expression.text).toEqual(name)
})

import * as ts from 'typescript'
import { CallExpression } from '@/model/code/Expression'

const name = 'alert'
const text = 'Hello'
let expression = null

test(`load`, () => {
    const node = ts.createCall(
        ts.createIdentifier(name),
        undefined,
        [ts.createStringLiteral(text)]
    )
    expression = CallExpression.load(node)
    expect(expression.expression.value).toEqual(name)
})

test(`toNode`, () => {
    const node = expression.toNode()
    expect(node.expression.text).toEqual(name)
})

import * as ts from 'typescript'
import { NewExpression } from '@/model/code/Expression'

const name = 'User'
let expression = null

test(`load`, () => {
    const node = ts.createCall(
        ts.createIdentifier(name),
        undefined,
        []
    )
    expression = NewExpression.load(node)
    expect(expression.expression.name).toEqual(name)
})

test(`toNode`, () => {
    const node = expression.toNode()
    expect(node.expression.text).toEqual(name)
})

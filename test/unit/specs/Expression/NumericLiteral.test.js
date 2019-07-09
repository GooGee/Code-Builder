import * as ts from 'typescript'
import { NumericLiteral } from '@/model/code/Expression'

const value = 123
let expression = null

test(`load`, () => {
    const node = ts.createNumericLiteral(value)
    expression = NumericLiteral.load(node)
    expect(expression.text).toEqual(value)
})

test(`toNode`, () => {
    const node = expression.toNode()
    expect(node.text).toEqual(value)
})

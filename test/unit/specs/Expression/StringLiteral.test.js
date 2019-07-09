import * as ts from 'typescript'
import { StringLiteral } from '@/model/code/Expression'

const value = 'abc'
let expression = null

test(`load`, () => {
    const node = ts.createStringLiteral(value)
    expression = StringLiteral.load(node)
    expect(expression.value).toEqual(value)
})

test(`toNode`, () => {
    const node = expression.toNode()
    expect(node.text).toEqual(value)
})

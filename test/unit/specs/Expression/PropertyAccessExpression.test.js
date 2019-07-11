import * as ts from 'typescript'
import { PropertyAccessExpression } from '@/model/code/Expression'

const module = 'User'
const name = 'name'
let expression = null

test(`load`, () => {
    const node = ts.createPropertyAccess(
        ts.createIdentifier(module),
        name
    )
    expression = PropertyAccessExpression.load(node)
    expect(expression.value).toEqual(name)
})

test(`toNode`, () => {
    const node = expression.toNode()
    expect(node.name.text).toEqual(name)
})

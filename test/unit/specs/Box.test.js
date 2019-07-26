import * as ts from 'typescript'
import { Chain, Compute, Lambda } from '@/model/code/Box'

const age = 'age'
const chain = new Chain

test(`Chain load`, () => {
    const eee = ts.createIdentifier(age)
    chain.load(eee)
    expect(chain.text).toEqual(age)
})

test(`Chain toNode`, () => {
    const node = chain.toNode()
    expect(node.text).toEqual(age)
})


let compute = null

test(`Compute load`, () => {
    const eee = ts.createBinary(
        ts.createIdentifier(age),
        ts.SyntaxKind.LessThanToken,
        ts.createNumericLiteral(18)
    )
    compute = Compute.load(eee)
    expect(compute.left.BoxItem.text).toEqual(age)
})

test(`Compute toNode`, () => {
    const node = compute.toNode()
    expect(node.left.text).toEqual(age)
})


const node = ts.createArrowFunction(
    undefined,
    undefined,
    [],
    undefined,
    ts.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
    ts.createFalse()
)
const lambda = Lambda.load(node)

test(`Lambda load`, () => {
    expect(lambda.ParameterManager.list.length).toEqual(0)
})

test(`Lambda toNode`, () => {
    const node = lambda.toNode()
    expect(node.parameters.length).toEqual(0)
})

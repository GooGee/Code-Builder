import * as ts from 'typescript'
import { ChainBox, ComputeBox, LambdaBox } from '@/model/code/Box'

const age = 'age'
const box = new ChainBox

test(`ChainBox load`, () => {
    const eee = ts.createIdentifier(age)
    box.load(eee)
    expect(box.chain.text).toEqual(age)
})

test(`ChainBox toNode`, () => {
    const node = box.toNode()
    expect(node.text).toEqual(age)
})


const bb = new ComputeBox

test(`ComputeBox load`, () => {
    const eee = ts.createBinary(
        ts.createIdentifier(age),
        ts.SyntaxKind.LessThanToken,
        ts.createNumericLiteral(18)
    )
    bb.load(eee)
    expect(bb.left.chain.text).toEqual(age)
})

test(`ComputeBox toNode`, () => {
    const node = bb.toNode()
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
const lb = LambdaBox.load(node)

test(`LambdaBox load`, () => {
    expect(lb.ParameterManager.list.length).toEqual(0)
})

test(`LambdaBox toNode`, () => {
    const node = lb.toNode()
    expect(node.parameters.length).toEqual(0)
})

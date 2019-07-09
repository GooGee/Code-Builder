import * as ts from 'typescript'
import { ChainBox, ComputeBox } from '@/model/code/Box'

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

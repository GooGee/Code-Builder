import * as ts from 'typescript'
import { ClassConstructor } from '@/model/data/Member'

let member = null

test(`load`, () => {
    const node = ts.createConstructor(
        undefined,
        [],
        [],
        ts.createBlock([])
    )
    member = ClassConstructor.load(node)
    expect(member.isConstructor).toEqual(true)
})

test(`toNode`, () => {
    const node = member.toNode()
    expect(node.kind).toEqual(ts.SyntaxKind.Constructor)
})

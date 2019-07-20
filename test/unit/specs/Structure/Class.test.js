import * as ts from 'typescript'
import { Class } from '@/model/data/Structure'

let type = null

test(`load`, () => {
    const name = 'Item'
    const node = ts.createClassDeclaration(
        undefined,
        [],
        name,
        [],
        [],
        []
    )
    type = Class.load(node)
    expect(type.name).toEqual(name)
})

test(`toNode`, () => {
    const node = type.toNode()
    expect(node.kind).toEqual(ts.SyntaxKind.ClassDeclaration)
})

test(`open`, () => {
    type.open()
    expect(type.opened).toBeTruthy()
})

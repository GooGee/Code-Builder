import * as ts from 'typescript'
import { Enum } from '@/model/data/Structure'

let type = null

test(`load`, () => {
    const name = 'Direction'
    const node = ts.createEnumDeclaration(
        undefined,
        [],
        name,
        []
    )
    type = Enum.load(node)
    expect(type.name).toEqual(name)
})

test(`toNode`, () => {
    const node = type.toNode()
    expect(node.kind).toEqual(ts.SyntaxKind.EnumDeclaration)
})

test(`open`, () => {
    type.open()
    expect(type.opened).toBeTruthy()
})

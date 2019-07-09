import * as ts from 'typescript'
import { Enum } from '@/model/data/Type'

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

test(`make`, () => {
    const name = 'East'
    const member = type.make(name)
    expect(member.name).toEqual(name)
})

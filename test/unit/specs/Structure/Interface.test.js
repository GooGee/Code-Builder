import * as ts from 'typescript'
import { Interface } from '@/model/data/Structure'

let iii = null

test(`load`, () => {
    const name = 'Shape'
    const node = ts.createInterfaceDeclaration(
        undefined,
        [],
        name,
        undefined,
        [],
        []
    )
    iii = Interface.load(node)
    expect(iii.name).toEqual(name)
})

test(`toNode`, () => {
    const node = iii.toNode()
    expect(node.kind).toEqual(ts.SyntaxKind.InterfaceDeclaration)
})

test(`open`, () => {
    iii.open()
    expect(iii.opened).toBeTruthy()
})

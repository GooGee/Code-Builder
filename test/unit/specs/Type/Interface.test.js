import * as ts from 'typescript'
import { Interface } from '@/model/data/Type'

let type = null

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
    type = Interface.load(node)
    expect(type.name).toEqual(name)
})

test(`toNode`, () => {
    const node = type.toNode()
    expect(node.kind).toEqual(ts.SyntaxKind.InterfaceDeclaration)
})

test(`open`, () => {
    type.open()
    expect(type.opened).toBeTruthy()
})

test(`extend`, () => {
    const name = 'Shape'
    type.extend([name])
    const heritage = type.HeritageManager.list[0]
    expect(heritage.name).toEqual(name)
})

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
    type.extend('Shape')
    expect(type.HeritageManager.list.length).toEqual(1)
})

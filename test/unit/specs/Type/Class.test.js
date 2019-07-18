import * as ts from 'typescript'
import { Class } from '@/model/data/Type'

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

test(`extend`, () => {
    const name = 'Item'
    type.extend([name])
    const heritage = type.HeritageManager.extendList[0]
    expect(heritage.name).toEqual(name)
})

test(`implement`, () => {
    const name = 'Node'
    type.implement([name])
    const heritage = type.HeritageManager.implementList[0]
    expect(heritage.name).toEqual(name)
})

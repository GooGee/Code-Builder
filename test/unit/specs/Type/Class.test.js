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
    type.extend('Item')
    expect(type.HeritageManager.extendList.length).toEqual(1)
})

test(`implement`, () => {
    type.implement('Node')
    expect(type.HeritageManager.implementList.length).toEqual(1)
})

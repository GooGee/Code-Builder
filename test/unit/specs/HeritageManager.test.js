import * as ts from 'typescript'
import HeritageManager from '@/model/data/HeritageManager'

const manager = new HeritageManager
let heritage = null

test(`load`, () => {
    heritage = ts.createExpressionWithTypeArguments(
        [],
        ts.createIdentifier('Node')
    )
    const list = [heritage]
    const clause = ts.createHeritageClause(
        ts.SyntaxKind.ImplementsKeyword,
        list
    )
    manager.load([clause])
    expect(manager.list.length).toEqual(1)
})

test(`implement`, () => {
    manager.implement(['Shape'])
    expect(manager.list.length).toEqual(1)
})

test(`extend`, () => {
    manager.extend(['List'])
    expect(manager.list.length).toEqual(2)
})

test(`toNodeArray`, () => {
    const list = manager.toNodeArray()
    expect(list.length).toEqual(2)
})

test(`extendText`, () => {
    expect(manager.extendText).toBeTruthy()
})

test(`implementText`, () => {
    expect(manager.implementText).toBeTruthy()
})

import * as ts from 'typescript'
import HeritageManager from '@/model/data/HeritageManager'

const manager = new HeritageManager
let heritage = null

test(`make`, () => {
    const name = 'Shape'
    heritage = manager.make([name], true)
    expect(heritage.name).toEqual(name)
})

test(`load`, () => {
    const list = [heritage.toNode()]
    const clause = ts.createHeritageClause(
        ts.SyntaxKind.ImplementsKeyword,
        list
    )
    manager.load([clause])
    expect(manager.list.length).toEqual(1)
})

test(`toNodeArray`, () => {
    const list = manager.toNodeArray()
    expect(list.length).toEqual(1)
})

test(`extendText`, () => {
    expect(manager.text).toBeTruthy()
})

test(`implementText`, () => {
    expect(manager.text).toBeTruthy()
})

test(`text`, () => {
    expect(manager.text).toBeTruthy()
})

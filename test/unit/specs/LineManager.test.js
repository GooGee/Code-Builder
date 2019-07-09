import * as ts from 'typescript'
import LineManager from '@/model/code/LineManager'

const manager = new LineManager

test(`load`, () => {
    const eee = ts.createReturn()
    manager.load([eee])
    expect(manager.list.length).toEqual(1)
})

test(`toNodeArray`, () => {
    const list = manager.toNodeArray()
    expect(list.length).toEqual(1)
})


let line = null

test(`make`, () => {
    line = manager.make()
    manager.add(line)
    expect(manager.list.length).toEqual(2)
})

test(`remove`, () => {
    manager.remove(line)
    expect(manager.list.length).toEqual(1)
})

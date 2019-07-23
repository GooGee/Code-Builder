import * as ts from 'typescript'
import ImportManager from '@/model/data/ImportManager'
import Module from '@/model/data/Module'

const sf = ts.createSourceFile('Test.ts', '', ts.ScriptTarget.ES5)
const module = new Module(sf)
const manager = new ImportManager(module)

const path = './App'
const iii = manager.make(path)

test(`make`, () => {
    expect(iii.path).toEqual(path)
})

test(`load`, () => {
    const list = [iii.toNode()]
    manager.load(list)
    expect(manager.list.length).toEqual(1)
})

test(`findName`, () => {
    const found = manager.findName(iii.name)
    expect(found.name).toEqual(iii.name)
})

test(`findPath`, () => {
    const found = manager.findPath(path)
    expect(found.path).toEqual(iii.path)
})

test(`toNodeArray`, () => {
    const list = manager.toNodeArray()
    expect(list.length).toEqual(1)
})

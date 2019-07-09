import ImportManager from '@/model/data/ImportManager'

const manager = new ImportManager

const path = './App'
const iii = manager.make(path)

test(`make`, () => {
    expect(iii.path).toEqual(path)
})

test(`load`, () => {
    manager.load(iii.toNode())
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

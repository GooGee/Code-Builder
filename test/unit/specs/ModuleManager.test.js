import Builder from '@/model/Builder'

const project = Builder.makeProject('Test')
const manager = project.ModuleManager

const name = 'App'
const mmm = manager.make(name)

test(`make`, () => {
    expect(mmm.name).toEqual(name)
})

test(`load`, () => {
    manager.load(mmm.sf)
    expect(manager.list.length).toEqual(1)
})

test(`findPath`, () => {
    const found = manager.findPath(mmm.path)
    expect(found.name).toEqual(mmm.name)
})

test(`remove`, () => {
    const mmm = manager.list[0]
    manager.remove(mmm)
    const found = manager.find(name)
    expect(found).toBeFalsy()
})

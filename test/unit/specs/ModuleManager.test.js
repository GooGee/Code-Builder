import Builder from '@/model/Builder'

const project = Builder.makeProject('Test')
const manager = project.ModuleManager

const name = 'App'
const mmm = manager.make(name)

test(`make`, () => {
    manager.add(mmm)
    expect(mmm.name).toEqual(name)
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

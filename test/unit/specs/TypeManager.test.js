import TypeManager from '@/model/data/TypeManager'

const manager = new TypeManager

test(`makeClass`, () => {
    const name = 'Animal'
    const type = manager.makeClass(name)
    manager.add(type)
    expect(type.name).toEqual(name)
})

test(`makeEnum`, () => {
    const name = 'Direction'
    const type = manager.makeEnum(name)
    manager.add(type)
    expect(type.name).toEqual(name)
})

test(`makeInterface`, () => {
    const name = 'Shape'
    const type = manager.makeInterface(name)
    manager.add(type)
    expect(type.name).toEqual(name)
})

test(`toNodeArray`, () => {
    const list = manager.toNodeArray()
    expect(list.length).toEqual(3)
})

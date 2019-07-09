import GenericManager from '@/model/data/GenericManager'

const manager = new GenericManager
let parameter = null

test(`make`, () => {
    const name = 'T'
    parameter = manager.make(name)
    expect(parameter.name).toEqual(name)
})

test(`load`, () => {
    const list = [parameter.toNode()]
    manager.load(list)
    expect(manager.list.length).toEqual(1)
})

test(`toNodeArray`, () => {
    const list = manager.toNodeArray()
    expect(list.length).toEqual(1)
})

test(`text`, () => {
    expect(manager.text).toBeTruthy()
})

import Manager from '@/model/Manager'

const manager = new Manager

const first = 'first'
const second = 'second'

test(`add`, () => {
    manager.add(first)
    expect(manager.list.length).toEqual(1)
})

test(`insert`, () => {
    manager.insert(second, first)
    expect(manager.list[0]).toEqual(second)
})

test(`moveUp`, () => {
    manager.moveUp(first)
    expect(manager.list[0]).toEqual(first)
})

test(`moveDown`, () => {
    manager.moveDown(first)
    expect(manager.list[0]).toEqual(second)
})

test(`remove`, () => {
    manager.remove(first)
    expect(manager.list.length).toEqual(1)
})

test(`clear`, () => {
    manager.clear()
    expect(manager.list.length).toEqual(0)
})

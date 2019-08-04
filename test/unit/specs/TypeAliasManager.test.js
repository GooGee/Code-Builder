import * as ts from 'typescript'
import TypeAliasManager from '@/model/data/TypeAliasManager'

const manager = new TypeAliasManager
const name = 'Basic'

test(`load`, () => {
    const ta = manager.make(name)
    const list = [
        ta.toNode()
    ]
    manager.load(list)
    expect(manager.list.length).toEqual(1)
})

test(`toNodeArray`, () => {
    const list = manager.toNodeArray()
    expect(list.length).toEqual(1)
})

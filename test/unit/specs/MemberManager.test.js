import { ClassMemberManager, InterfaceMemberManager } from '@/model/data/MemberManager'

const manager = new ClassMemberManager
const list = []

test(`makeConstructor`, () => {
    const member = manager.makeConstructor()
    expect(member.isConstructor).toBeTruthy()
})

test(`makeMethod`, () => {
    const name = 'say'
    const type = 'string'
    const member = manager.makeMethod(name, [type])
    list.push(member.toNode())
    expect(member.name).toEqual(name)
})

test(`makeProperty`, () => {
    const name = 'name'
    const type = 'string'
    const member = manager.makeProperty(name, [type])
    list.push(member.toNode())
    expect(member.name).toEqual(name)
})

test(`load`, () => {
    manager.load(list)
    expect(manager.list.length).toEqual(2)
})

test(`toNodeArray`, () => {
    const list = manager.toNodeArray()
    expect(list.length).toEqual(2)
})


const imanager = new InterfaceMemberManager
const ilist = []

test(`makeMethod Interface`, () => {
    const name = 'say'
    const type = 'string'
    const member = imanager.makeMethod(name, [type])
    ilist.push(member.toNode())
    expect(member.name).toEqual(name)
})

test(`makeProperty Interface`, () => {
    const name = 'name'
    const type = 'string'
    const member = imanager.makeProperty(name, [type])
    ilist.push(member.toNode())
    expect(member.name).toEqual(name)
})

test(`load Interface`, () => {
    imanager.load(ilist)
    expect(imanager.list.length).toEqual(2)
})

test(`toNodeArray Interface`, () => {
    const list = imanager.toNodeArray()
    expect(list.length).toEqual(2)
})

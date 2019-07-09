import NameManager from '@/model/data/NameManager'
import { EnumMember } from '@/model/data/Member'

const manager = new NameManager

const name = 'name'
const member = new EnumMember(name)

test(`add ${name}`, () => {
    manager.add(member)
    expect(member.name).toEqual(name)
})

test(`add ${name} again`, () => {
    const call = () => manager.add(member)
    expect(call).toThrowError()
})

test(`find ${name}`, () => {
    const found = manager.find(name)
    expect(found).toEqual(member)
})

test(`remove ${name}`, () => {
    manager.remove(member)
    const found = manager.find(name)
    expect(found).toBeFalsy()
})

import * as ts from 'typescript'
import { EnumMember } from '@/model/data/Member'

let member = null

test(`load`, () => {
    const name = 'North'
    const node = ts.createEnumMember(name)
    member = EnumMember.load(node)
    expect(member.name).toEqual(name)
})

test(`toNode`, () => {
    const node = member.toNode()
    expect(node.kind).toEqual(ts.SyntaxKind.EnumMember)
})

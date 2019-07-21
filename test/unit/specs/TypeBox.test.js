import * as ts from 'typescript'
import TypeBox from '@/model/data/TypeBox'
import { KeyWordType } from '@/model/data/TypeNode'

const kind = ts.SyntaxKind.NumberKeyword

test(`setType`, () => {
    const type = new KeyWordType(ts.SyntaxKind.AnyKeyword)
    const box = new TypeBox(type)
    const name = 'string'
    box.setType([name])
    expect(box.type.name).toEqual(name)
})

test(`make`, () => {
    const name = 'string'
    const box = TypeBox.make([name])
    expect(box.type.name).toEqual(name)
})

test(`load`, () => {
    const node = ts.createKeywordTypeNode(kind)
    const box = TypeBox.load(node)
    expect(box.type.kind).toEqual(kind)
})

test(`update`, () => {
    const type = new KeyWordType(ts.SyntaxKind.AnyKeyword)
    const box = new TypeBox(type)
    const node = ts.createKeywordTypeNode(kind)
    box.update(node)
    expect(box.type.kind).toEqual(kind)
})

test(`toNode`, () => {
    const type = new KeyWordType(kind)
    const box = new TypeBox(type)
    const node = box.toNode()
    expect(node.kind).toEqual(kind)
})

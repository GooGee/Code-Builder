import * as ts from 'typescript'
import TypeManager from '@/model/data/TypeManager'

const manager = new TypeManager

test(`load`, () => {
    const kind = ts.SyntaxKind.AnyKeyword
    const node = ts.createKeywordTypeNode(kind)
    const list = [node]
    manager.load(list)
    expect(manager.list.length).toEqual(1)
})

test(`toNodeArray`, () => {
    const list = manager.toNodeArray()
    expect(list.length).toEqual(1)
})

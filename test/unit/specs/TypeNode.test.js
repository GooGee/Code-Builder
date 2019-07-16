import * as ts from 'typescript'
import TypeNode, { Identifier, QualifiedName } from '@/model/data/TypeNode'


test(`load ArrayType`, () => {
    const node = ts.createArrayTypeNode(
        ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
    )
    const type = TypeNode.load(node)
    expect(type.elementType.name).toEqual('any')
})

test(`load KeyWordType`, () => {
    const node = ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
    const type = TypeNode.load(node)
    expect(type.name).toEqual('any')
})

test(`load ReferenceType`, () => {
    const left = 'Entity'
    const right = 'List'
    const qn = ts.createQualifiedName(
        ts.createIdentifier(left),
        right
    )
    const node = ts.createTypeReferenceNode(
        qn,
        undefined
    )
    const type = TypeNode.load(node)
    expect(type.type.name).toEqual('List')
})

test(`load Identifier`, () => {
    const name = 'List'
    const node = ts.createIdentifier(name)
    const type = Identifier.load(node)
    expect(type.name).toEqual(name)
})

test(`load QualifiedName`, () => {
    const left = 'Entity'
    const right = 'List'
    const node = ts.createQualifiedName(
        ts.createIdentifier(left),
        right
    )
    const type = QualifiedName.load(node)
    expect(type.name).toEqual(right)
})

test(`updateArgument`, () => {
    const name = 'Array'
    const argument = ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
    const node = ts.createTypeReferenceNode(
        name,
        [argument]
    )
    const type = TypeNode.load(node)
    expect(type.ArgumentManager.list.length).toEqual(1)
})

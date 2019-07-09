import * as ts from 'typescript'
import TypeChain from '@/model/data/TypeChain'


test(`load Identifier`, () => {
    const name = 'List'
    const node = ts.createTypeReferenceNode(
        ts.createIdentifier(name),
        undefined
    )
    const chain = TypeChain.load(node)
    expect(chain.type.name).toEqual(name)
})

test(`load KeyWord`, () => {
    const node = ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
    const chain = TypeChain.load(node)
    expect(chain.type.name).toEqual('any')
})

test(`load QualifiedName`, () => {
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
    const chain = TypeChain.load(node)
    chain.update(node)
    expect(chain.type.name).toEqual(right)
})

test(`updateArgument`, () => {
    const name = 'Array'
    const argument = ts.createTypeReferenceNode(
        ts.createIdentifier('string'),
        undefined
    )
    const node = ts.createTypeReferenceNode(
        ts.createIdentifier(name),
        [argument]
    )
    const chain = TypeChain.load(node)
    expect(chain.ArgumentManager.list.length).toEqual(1)
})

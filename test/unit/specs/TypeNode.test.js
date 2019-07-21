import * as ts from 'typescript'
import TypeNode, { Identifier, QualifiedName } from '@/model/data/TypeNode'


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

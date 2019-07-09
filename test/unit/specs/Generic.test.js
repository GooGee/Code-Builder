import * as ts from 'typescript'
import Generic from '@/model/data/Generic'

const name = 'T'
let generic = null

test(`load`, () => {
    const node = ts.createTypeParameterDeclaration(
        name,
        undefined,
        undefined
    )
    generic = Generic.load(node)
    expect(generic.name).toEqual(name)
})

test(`toNode`, () => {
    const node = generic.toNode()
    expect(node.name.text).toEqual(name)
})

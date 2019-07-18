import * as ts from 'typescript'
import ParameterManager from '@/model/data/ParameterManager'

const manager = new ParameterManager

test(`load`, () => {
    const name = 'name'
    const node = ts.createParameter(
        undefined,
        [],
        undefined,
        name,
        undefined,
        ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
        undefined
    )
    manager.load([node])
    expect(manager.list.length).toEqual(1)
})

test(`make`, () => {
    const name = 'text'
    const parameter = manager.make(name, ['string'])
    manager.add(parameter)
    expect(parameter.name).toEqual(name)
})

test(`toNodeArray`, () => {
    const list = manager.toNodeArray()
    expect(list.length).toEqual(2)
})

test(`text`, () => {
    expect(manager.text).toBeTruthy()
})

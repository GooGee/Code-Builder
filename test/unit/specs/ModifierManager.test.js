import * as ts from 'typescript'
import ModifierManager from '@/model/data/ModifierManager'

const manager = new ModifierManager

test(`load`, () => {
    const list = [
        ts.createModifier(ts.SyntaxKind.AbstractKeyword)
    ]
    manager.load(list)
    expect(manager.hasAbstract).toEqual(true)
})

test(`toNodeArray`, () => {
    const list = manager.toNodeArray()
    expect(list.length).toEqual(1)
})

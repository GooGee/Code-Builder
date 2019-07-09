import * as ts from 'typescript'
import ArgumentManager from '@/model/code/ArgumentManager'

const manager = new ArgumentManager

test(`load`, () => {
    const list = [
        ts.createIdentifier('name'),
        ts.createIdentifier('age')
    ]

    manager.load(list)
    expect(manager.list.length).toEqual(2)
})

test(`toNodeArray`, () => {
    const list = manager.toNodeArray()
    expect(list.length).toEqual(2)
})

test(`text`, () => {
    expect(manager.text).toBeTruthy()
})

import * as ts from 'typescript'
import Chain from '@/model/code/Chain'

const user = 'user'
const age = 'age'
const chain = new Chain

test(`load`, () => {
    const node = ts.createPropertyAccess(
        ts.createIdentifier(user),
        age
    )
    chain.load(node)
    expect(chain.root.name).toEqual(age)
})

test(`toNode`, () => {
    const node = chain.toNode()
    expect(node.name.text).toEqual(age)
})

test(`input`, () => {
    const value = 'null'
    chain.input(value)
    expect(chain.text).toEqual(value)
})

test(`inputNumber`, () => {
    const value = '123'
    chain.inputNumber(value)
    expect(chain.text).toEqual(value)
})

test(`inputString`, () => {
    const value = 'abc'
    chain.inputString(value)
    expect(chain.root.value).toEqual(value)
})

test(`start`, () => {
    chain.start(user)
    expect(chain.text).toEqual(user)
})

test(`makeNew`, () => {
    chain.makeNew([])
    expect(chain.root.isNew).toBeTruthy()
})

test(`remove`, () => {
    chain.remove(chain.root)
    expect(chain.root.name).toEqual(user)
})

test(`access`, () => {
    chain.access(age)
    expect(chain.root.name).toEqual(age)
})

test(`change`, () => {
    const value = 'say'
    chain.change(value, chain.root)
    expect(chain.root.name).toEqual(value)
})

test(`call`, () => {
    chain.call([])
    expect(chain.root.isCall).toBeTruthy()
})

import * as ts from 'typescript'
import Module from '@/model/data/Module'

const script = `
import * as ts from 'typescript'

class Item {}
`
const sf = ts.createSourceFile('test.ts', script, ts.ScriptTarget.ES5)
const mmm = new Module(sf)

test(`load`, () => {
    mmm.load()
    expect(mmm.ImportManager.list.length).toEqual(1)
    expect(mmm.StructureManager.list.length).toEqual(1)
})

test(`toNode`, () => {
    const sf = mmm.toNode()
    expect(sf.statements.length).toEqual(2)
})

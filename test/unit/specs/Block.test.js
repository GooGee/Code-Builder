import * as ts from 'typescript'
import Block, { CaseBlock } from '@/model/code/Block'

const block = new Block

test(`load`, () => {
    const statement = ts.createReturn(
        ts.createTrue()
    )
    const node = ts.createBlock(
        [statement]
    )
    block.load(node)
    expect(block.LineManager.list.length).toEqual(1)
})

test(`toNode`, () => {
    const node = block.toNode()
    expect(node.statements.length).toEqual(1)
})


const cb = new CaseBlock

test(`CaseBlock load`, () => {
    const node = ts.createCaseBlock([])
    cb.load(node)
    expect(cb.ClauseManager.list.length).toEqual(0)
})

test(`CaseBlock toNode`, () => {
    const node = cb.toNode()
    expect(node.clauses.length).toEqual(0)
})

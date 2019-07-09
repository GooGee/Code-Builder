import * as ts from 'typescript'
import Block from '@/model/code/Block'
import Line from '@/model/code/Line'

/**
 * need to search the block before defining a variable
 */
const block = new Block
const line = block.LineManager.make()

test(`load`, () => {
    const node = ts.createReturn(
        ts.createTrue()
    )
    line.load(node)
    expect(line.statement).toBeTruthy()
})

test(`toNode`, () => {
    const node = line.toNode()
    expect(node).toBeTruthy()
})

test(`makeAssign`, () => {
    line.makeAssign()
    expect(line.statement.isAssign).toBeTruthy()
})

test(`makeBreak`, () => {
    line.makeBreak()
    expect(line.statement.label).toEqual('break')
})

test(`makeCall`, () => {
    line.makeCall()
    expect(line.statement.isCall).toBeTruthy()
})

test(`makeContinue`, () => {
    line.makeContinue()
    expect(line.statement.label).toEqual('continue')
})

test(`makeFor`, () => {
    line.makeFor()
    expect(line.statement.isFor).toBeTruthy()
})

test(`makeForOf`, () => {
    line.makeForOf()
    expect(line.statement.isForOf).toBeTruthy()
})

test(`makeIf`, () => {
    line.makeIf()
    expect(line.statement.isIf).toBeTruthy()
})

test(`makeReturn`, () => {
    line.makeReturn()
    expect(line.statement.isReturn).toBeTruthy()
})

test(`makeSwitch`, () => {
    line.makeSwitch()
    expect(line.statement.isSwitch).toBeTruthy()
})

test(`makeTry`, () => {
    line.makeTry()
    expect(line.statement.isTry).toBeTruthy()
})

test(`makeDefine`, () => {
    line.makeDefine('name', 'string')
    expect(line.statement.isDefine).toBeTruthy()
})

test(`makeWhile`, () => {
    line.makeWhile()
    expect(line.statement.isWhile).toBeTruthy()
})

import * as ts from 'typescript'
import { CaseClause, CatchClause, DefaultClause } from '@/model/code/Clause'


// CatchClause

const error = 'error'
let clause = null

test(`load CatchClause`, () => {
    const variable = ts.createVariableDeclaration(
        error
    )
    const node = ts.createCatchClause(
        variable,
        ts.createBlock([])
    )
    clause = CatchClause.load(node)
    expect(clause.variable.name).toEqual(error)
})

test(`CatchClause toNode`, () => {
    const node = clause.toNode()
    expect(node.variableDeclaration.name.text).toEqual(error)
})


// CaseClause

const male = 'male'
let cc = null

test(`load CaseClause`, () => {
    const node = ts.createCaseClause(
        ts.createStringLiteral(male),
        []
    )
    const clause = CaseClause.load(node)
    cc = clause
    expect(clause.box.chain.root.value).toEqual(male)
})

test(`CaseClause toNode`, () => {
    const node = cc.toNode()
    expect(node.expression.text).toEqual(male)
})


// DefaultClause

let dc = null

test(`load DefaultClause`, () => {
    const node = ts.createDefaultClause(
        [ts.createReturn()]
    )
    const clause = DefaultClause.load(node)
    dc = clause
    expect(clause.LineManager.list.length).toEqual(1)
})

test(`CaseClause toNode`, () => {
    const node = dc.toNode()
    expect(node.statements.length).toEqual(1)
})

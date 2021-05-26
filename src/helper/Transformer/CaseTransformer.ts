import ts from 'typescript'
import Transformer from './Transformer'

function addNode(
    parent: ts.CaseBlock,
    at?: ts.CaseClause,
) {
    const item = ts.factory.createCaseClause(
        ts.factory.createNull(),
        [ts.factory.createBreakStatement()],
    )
    const list = Transformer.insert(parent.clauses, item, at)
    const clone = ts.getMutableClone(parent) as any
    clone.clauses = list
    Transformer.replace(parent, clone)
}

export default {
    addNode,
}

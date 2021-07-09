import ts from 'typescript'
import Transformer from './Transformer'

function addNode(parent: ts.CaseBlock, at?: ts.CaseClause) {
    const item = ts.factory.createCaseClause(ts.factory.createNull(), [
        ts.factory.createBreakStatement(),
    ])
    const list = Transformer.insert(parent.clauses, item, at)
    const to = ts.factory.updateCaseBlock(parent, list)
    Transformer.replace(parent, to)
}

const CaseTransformer = {
    addNode,
}

export default CaseTransformer

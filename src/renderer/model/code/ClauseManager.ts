import * as ts from 'typescript'
import Manager from '../Manager'
import { CaseClause, DefaultClause } from './Clause'
import { BlockBase } from './Block'

export default class ClauseManager extends Manager<CaseClause> {
    readonly block: BlockBase
    defaultClause: DefaultClause = new DefaultClause(this.block)

    constructor(block: BlockBase) {
        super()
        this.block = block
    }

    make() {
        const clause = new CaseClause(this.block)
        return clause
    }

    load(list: ReadonlyArray<ts.CaseOrDefaultClause>) {
        list.forEach(clause => {
            if (clause.kind == ts.SyntaxKind.CaseClause) {
                const ccc = CaseClause.load(clause, this.block)
                this.add(ccc)
            } else {
                this.defaultClause.LineManager.load(clause.statements)
            }
        })
    }

    toNodeArray() {
        const list: Array<ts.CaseOrDefaultClause> = []
        this.list.forEach(casee => {
            list.push(casee.toNode())
        })
        list.push(this.defaultClause.toNode())
        return list
    }
}
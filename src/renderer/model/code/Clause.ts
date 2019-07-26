import * as ts from 'typescript'
import Block, { BlockBase } from './Block'
import { Variable } from '../data/Member'
import LineManager from './LineManager'
import Node from '../Node'
import Box from './Box'

export default abstract class Clause implements Node {
    abstract source: ts.Node | null
    abstract toNode(): ts.Node
}

export abstract class SelectClause extends Clause {
    readonly isDefault: boolean = false
    readonly block: BlockBase
    readonly LineManager: LineManager

    constructor(block: BlockBase) {
        super()
        this.block = block
        this.LineManager = new LineManager(this.block)
    }
}

export class CaseClause extends SelectClause {
    readonly box: Box
    source: ts.CaseClause | null = null

    constructor(block: BlockBase, box: Box) {
        super(block)
        this.box = box
    }

    static load(clause: ts.CaseClause, block: BlockBase) {
        const box = Box.load(clause.expression)
        const ccc = new CaseClause(block, box)
        ccc.LineManager.load(clause.statements)
        ccc.source = clause
        return ccc
    }

    toNode() {
        const node = ts.createCaseClause(
            this.box.toNode(),
            this.LineManager.toNodeArray()
        )
        return node
    }
}

export class DefaultClause extends SelectClause {
    readonly isDefault: boolean = true
    source: ts.DefaultClause | null = null

    static load(clause: ts.DefaultClause, block: BlockBase) {
        let ccc = new DefaultClause(block)
        ccc.LineManager.load(clause.statements)
        ccc.source = clause
        return ccc
    }

    toNode() {
        let node = ts.createDefaultClause(
            this.LineManager.toNodeArray()
        )
        return node
    }
}

export class CatchClause extends Clause {
    readonly variable: Variable
    readonly block: Block = new Block(this)
    source: ts.CatchClause | null = null

    constructor(variable: Variable) {
        super()
        this.variable = variable
        variable.hasType = false
        variable.hasValue = false
    }

    static load(clause: ts.CatchClause) {
        let variable = Variable.load(clause.variableDeclaration!)
        let ccc = new CatchClause(variable)
        ccc.source = clause
        return ccc
    }

    toNode() {
        let node = ts.createCatchClause(
            this.variable.toNode(),
            this.block.toNode()
        )
        return node
    }
}

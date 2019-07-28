import * as ts from 'typescript'
import { CaseClause, DefaultClause, CatchClause } from './Clause'
import LineManager from './LineManager'
import { VariableStatement, Statement } from './Statement'
import { ClassMethod, ClassConstructor } from '../data/Member'
import Node from '../Node'
import ClauseManager from './ClauseManager'

type BlockOwner = Statement | ClassConstructor | ClassMethod | CaseClause | DefaultClause | CatchClause

export abstract class BlockBase implements Node {
    owner: BlockOwner
    abstract source: ts.Node | null

    abstract VariableList: Array<string>
    abstract toNode(): ts.Node

    constructor(owner: BlockOwner) {
        this.owner = owner
    }

    get ArgumentList() {
        const list: Array<string> = []
        if (this.owner instanceof ClassMethod) {
            this.owner.ParameterManager.list.forEach(parameter => list.push(parameter.name))
        }
        return list
    }

    /**
     * get the block that included this.owner
     */
    get ownerBlock(): Block | null {
        return null
    }

    get inLoop(): boolean {
        if (this.owner instanceof Statement) {
            return this.owner.isFor || this.owner.isForOf || this.owner.isWhile
        }
        if (this.ownerBlock) {
            return this.ownerBlock.inLoop
        }
        return false
    }

    get inSelect(): boolean {
        if (this.owner instanceof CaseClause) {
            return true
        }
        if (this.ownerBlock) {
            return this.ownerBlock.inSelect
        }
        return false
    }
}

export default class Block extends BlockBase {
    multiLine: boolean = true
    readonly LineManager: LineManager = new LineManager(this)
    source: ts.Block | null = null

    get VariableList() {
        const list: Array<string> = this.ArgumentList
        this.LineManager.list.forEach(line => {
            if (line.statement) {
                if (line.statement.isDefine) {
                    const statement = line.statement as VariableStatement
                    list.push(statement.variable.name)
                }
            }
        })
        return list
    }

    load(block: ts.Block) {
        this.source = block
        this.LineManager.load(block.statements)
    }

    toNode() {
        return ts.createBlock(this.LineManager.toNodeArray(), this.multiLine)
    }

}

export class CaseBlock extends BlockBase {
    hasDefault: boolean = false
    readonly ClauseManager: ClauseManager = new ClauseManager(this)
    source: ts.CaseBlock | null = null

    get VariableList() {
        const list: Array<string> = this.ArgumentList
        this.ClauseManager.list.forEach(clause => {
            clause.LineManager.list.forEach(line => {
                if (line.statement) {
                    if (line.statement.isDefine) {
                        const statement = line.statement as VariableStatement
                        list.push(statement.variable.name)
                    }
                }
            })
        })
        return list
    }

    load(block: ts.CaseBlock) {
        this.source = block
        this.ClauseManager.load(block.clauses)
    }

    toNode() {
        const node = ts.createCaseBlock(
            this.ClauseManager.toNodeArray()
        )
        return node
    }
}

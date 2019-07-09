import * as ts from 'typescript'
import Manager from '../Manager'
import { CaseClause, DefaultClause, CatchClause } from './Clause'
import LineManager from './LineManager'
import { VariableStatement, Statement } from './Statement'
import { ClassMethod, ClassConstructor } from '../data/Member'
import Node from '../Node'
import Lambda from '../data/Lambda'

type BlockOwner = Statement | Lambda | ClassConstructor | ClassMethod | CaseClause | DefaultClause | CatchClause

export abstract class BlockBase implements Node {
    owner: BlockOwner
    abstract source: ts.Node | null

    abstract VariableList: string[]
    abstract toNode(): ts.Node

    constructor(owner: BlockOwner) {
        this.owner = owner
    }

    get ArgumentList() {
        let list: string[] = []
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
        let list: string[] = this.ArgumentList
        this.LineManager.list.forEach(line => {
            if (line.statement) {
                if (line.statement.isDefine) {
                    let statement = line.statement as VariableStatement
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

    update(block: ts.Block) {
        this.source = block
        this.LineManager.update(block.statements)
    }

    toNode() {
        return ts.createBlock(this.LineManager.toNodeArray(), this.multiLine)
    }

}

export class CaseBlock extends BlockBase {
    hasDefault: boolean = false
    defaultClause: DefaultClause = new DefaultClause(this)
    readonly ClauseManager: Manager<CaseClause> = new Manager<CaseClause>()
    source: ts.CaseBlock | null = null

    get VariableList() {
        let list: string[] = this.ArgumentList
        this.ClauseManager.list.forEach(clause => {
            clause.LineManager.list.forEach(line => {
                if (line.statement) {
                    if (line.statement.isDefine) {
                        let statement = line.statement as VariableStatement
                        list.push(statement.variable.name)
                    }
                }
            })
        })
        return list
    }

    load(block: ts.CaseBlock) {
        this.source = block
        block.clauses.forEach(clause => {
            if (clause.kind == ts.SyntaxKind.CaseClause) {
                let ccc = CaseClause.load(clause, this)
                this.ClauseManager.add(ccc)
            } else {
                this.defaultClause = DefaultClause.load(clause, this)
                this.hasDefault = true
            }
        })
    }

    update(block: ts.CaseBlock) {
        this.source = block
        let index = 0
        block.clauses.forEach(clause => {
            if (clause.kind == ts.SyntaxKind.CaseClause) {
                this.ClauseManager.list[index].update(clause)
                index += 1
            } else {
                this.defaultClause.update(clause)
            }
        })
    }

    toNode() {
        let list: Array<ts.CaseClause | ts.DefaultClause> = []
        this.ClauseManager.list.forEach(clause => {
            list.push(clause.toNode())
        })
        return ts.createCaseBlock(list)
    }

    makeCase() {
        let sss = new CaseClause(this)
        return sss
    }

}

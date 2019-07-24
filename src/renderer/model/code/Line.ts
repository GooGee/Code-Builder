import * as ts from 'typescript'
import * as Statement from "./Statement"
import { CatchClause } from './Clause'
import TypeBox, { OwnerKind } from '../data/TypeBox'
import { Variable } from '../data/Member'
import { BlockBase } from './Block'
import { ChainBox } from './Box'

export default class Line {
    isDefine: boolean = false
    readonly owner: BlockBase
    statement: Statement.Statement | null = null

    constructor(owner: BlockBase) {
        this.owner = owner
    }

    get VariableList() {
        return this.owner.VariableList
    }

    makeAssign() {
        this.statement = new Statement.AssignStatement
    }

    makeBreak() {
        this.statement = new Statement.BreakStatement
    }

    makeCall() {
        this.statement = new Statement.CallStatement
    }

    makeContinue() {
        this.statement = new Statement.ContinueStatement
    }

    makeDefine() {
        this.isDefine = true
    }

    makeFrom() {
        return this.makeFor()
    }

    makeFor() {
        let vdl = this.makeVariableList('index', ['number'])
        vdl.variable.initializer = new ChainBox
        vdl.variable.initializer.chain.inputNumber(0)

        let statement = new Statement.ForStatement(vdl)
        this.statement = statement

        statement.condition.left.chain.start(vdl.variable.name)
        statement.condition.operator = ts.SyntaxKind.LessThanToken
        statement.condition.right = new ChainBox
        statement.condition.right.chain.inputNumber(0)

        statement.incrementor.left.chain.start(vdl.variable.name)
        statement.incrementor.operator = ts.SyntaxKind.PlusEqualsToken
        statement.incrementor.right = new ChainBox
        statement.step.chain.inputNumber(1)
    }

    makeEach() {
        return this.makeForOf()
    }

    makeForOf() {
        let vdl = this.makeVariableList('item', ['any'])
        this.statement = new Statement.ForOfStatement(vdl)
    }

    makeIf() {
        this.statement = new Statement.IfStatement
    }

    makeReturn() {
        this.statement = new Statement.ReturnStatement
    }

    makeSwitch() {
        this.statement = new Statement.SwitchStatement
    }

    makeTry() {
        let vvv = this.makeVariable('error', ['Error'])
        let clause = new CatchClause(vvv)
        this.statement = new Statement.TryStatement(clause)
    }

    makeVariable(name: string, list: string[]) {
        let node = TypeBox.make(list, OwnerKind.Variable)
        return new Variable(name, node)
    }

    makeVariableList(name: string, list: string[]) {
        let vvv = this.makeVariable(name, list)
        return new Statement.VariableList(vvv)
    }

    makeVariableStatement(name: string, list: string[]) {
        if (this.VariableList.indexOf(name) > -1) {
            throw `${name} already exists!`
        }
        let vdl = this.makeVariableList(name, list)
        this.statement = new Statement.VariableStatement(vdl)
    }

    makeWhile() {
        this.statement = new Statement.WhileStatement
    }

    load(node: ts.Statement) {
        this.statement = Statement.Statement.load(node)
    }

    toNode() {
        if (this.statement) {
            return this.statement.toNode()
        }
        throw 'Error! Empty Statement!'
    }

}

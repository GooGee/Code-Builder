import * as ts from 'typescript'
import * as Statement from "./Statement"
import { BlockBase } from './Block'

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
        this.statement = Statement.AssignStatement.make()
    }

    makeBreak() {
        this.statement = new Statement.BreakStatement
    }

    makeCall() {
        this.statement = Statement.CallStatement.make()
    }

    makeContinue() {
        this.statement = new Statement.ContinueStatement
    }

    makeDefine() {
        this.isDefine = true
    }

    makeFrom() {
        this.makeFor()
    }

    makeFor() {
        this.statement = Statement.ForStatement.make()
    }

    makeEach() {
        this.makeForOf()
    }

    makeForOf() {
        this.statement = Statement.ForOfStatement.make()
    }

    makeIf() {
        this.statement = Statement.IfStatement.make()
    }

    makeReturn() {
        this.statement = Statement.ReturnStatement.make()
    }

    makeSwitch() {
        this.statement = Statement.SwitchStatement.make()
    }

    makeTry() {
        this.statement = Statement.TryStatement.make()
    }

    makeVariableStatement(name: string, list: Array<string>) {
        if (this.VariableList.indexOf(name) > -1) {
            throw `${name} already exists!`
        }
        this.statement = Statement.VariableStatement.make(name, list)
    }

    makeWhile() {
        this.statement = Statement.WhileStatement.make()
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

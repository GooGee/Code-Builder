import * as ts from 'typescript'
import { CatchClause } from './Clause'
import Block, { CaseBlock } from './Block'
import { Variable } from '../data/Member'
import Node from '../Node'
import { AssignBox, ChainBox, ComputeBox } from './Box';
import LineManager from './LineManager'

export abstract class Statement implements Node {
    readonly label: string = ''
    readonly isSimple: boolean = false
    readonly isAssign: boolean = false
    readonly isCall: boolean = false
    readonly isDefine: boolean = false
    readonly isFor: boolean = false
    readonly isForOf: boolean = false
    readonly isIf: boolean = false
    readonly isReturn: boolean = false
    readonly isSwitch: boolean = false
    readonly isTry: boolean = false
    readonly isWhile: boolean = false
    readonly owner: LineManager | null = null
    abstract source: ts.Node | null

    get isEach() {
        return this.isForOf
    }

    get isFrom() {
        return this.isFor
    }

    static load(statement: ts.Statement): Statement {
        switch (statement.kind) {
            case ts.SyntaxKind.BreakStatement:
                return BreakStatement.load(statement as ts.BreakStatement)
                break

            case ts.SyntaxKind.ContinueStatement:
                return ContinueStatement.load(statement as ts.ContinueStatement)
                break

            case ts.SyntaxKind.ExpressionStatement:
                return ExpressionStatement.load(statement as ts.ExpressionStatement)
                break

            case ts.SyntaxKind.ForStatement:
                return ForStatement.load(statement as ts.ForStatement)
                break

            case ts.SyntaxKind.ForOfStatement:
                return ForOfStatement.load(statement as ts.ForOfStatement)
                break

            case ts.SyntaxKind.IfStatement:
                return IfStatement.load(statement as ts.IfStatement)
                break

            case ts.SyntaxKind.ReturnStatement:
                return ReturnStatement.load(statement as ts.ReturnStatement)
                break

            case ts.SyntaxKind.SwitchStatement:
                return SwitchStatement.load(statement as ts.SwitchStatement)
                break

            case ts.SyntaxKind.TryStatement:
                return TryStatement.load(statement as ts.TryStatement)
                break

            case ts.SyntaxKind.VariableStatement:
                return VariableStatement.load(statement as ts.VariableStatement)
                break

            case ts.SyntaxKind.WhileStatement:
                return WhileStatement.load(statement as ts.WhileStatement)
                break

            default:
                break
        }

        throw `Error loading statement: ${statement.kind}`
    }

    abstract toNode(): ts.Statement
}

export abstract class StatementWithBox extends Statement {
    readonly box: ChainBox

    constructor(canBeConstant: boolean = true) {
        super()
        this.box = new ChainBox(canBeConstant)
    }

}

export class BreakStatement extends Statement {
    readonly label: string = 'Break'
    readonly isSimple: boolean = true
    source: ts.BreakStatement | null = null

    static load(statement: ts.BreakStatement) {
        let sss = new BreakStatement()
        sss.source = statement
        return sss
    }

    toNode() {
        let node = ts.createBreak()
        return node
    }
}

export class ContinueStatement extends Statement {
    readonly label: string = 'Continue'
    readonly isSimple: boolean = true
    source: ts.ContinueStatement | null = null

    static load(statement: ts.ContinueStatement) {
        let sss = new ContinueStatement()
        sss.source = statement
        return sss
    }

    toNode() {
        let node = ts.createContinue()
        return node
    }
}

export class EmptyStatement extends Statement {
    readonly isEmpty: boolean = true
    source: ts.EmptyStatement | null = null

    static load(statement: ts.EmptyStatement) {
        let sss = new EmptyStatement()
        sss.source = statement
        return sss
    }

    toNode() {
        let node = ts.createEmptyStatement()
        return node
    }
}

export class ExpressionStatement {
    static load(statement: ts.ExpressionStatement) {
        if (statement.expression.kind == ts.SyntaxKind.BinaryExpression) {
            let sss = new AssignStatement
            sss.source = statement
            sss.box.load(statement.expression as ts.BinaryExpression)
            return sss
        }

        let sss = new CallStatement
        sss.source = statement
        sss.box.load(statement.expression)
        return sss
    }
}

export class AssignStatement extends Statement {
    readonly isAssign: boolean = true
    readonly box = new AssignBox
    source: ts.ExpressionStatement | null = null

    toNode() {
        let node = ts.createExpressionStatement(
            this.box.toNode()
        )
        return node
    }

}

export class CallStatement extends StatementWithBox {
    readonly isCall: boolean = true
    source: ts.ExpressionStatement | null = null

    constructor() {
        super(false)
    }

    toNode() {
        let node = ts.createExpressionStatement(
            this.box.toNode()
        )
        return node
    }

}

export class ForStatement extends Statement {
    readonly isFor: boolean = true
    vdl: VariableList
    condition: ComputeBox = new ComputeBox
    incrementor: AssignBox = new AssignBox
    readonly block: Block = new Block(this)
    source: ts.ForStatement | null = null

    get index(): Variable {
        return this.vdl.variable
    }

    get start(): ChainBox {
        return this.index.initializer!
    }

    get end(): ChainBox {
        let box = this.condition.right as ChainBox
        return box
    }

    get step(): ChainBox {
        let box = this.incrementor.right as ChainBox
        return box
    }

    get less(): boolean {
        return this.condition.operator == ts.SyntaxKind.LessThanToken
    }

    set less(value: boolean) {
        if (value) {
            this.condition.operator = ts.SyntaxKind.LessThanToken
        } else {
            this.condition.operator = ts.SyntaxKind.EqualsEqualsToken
        }
    }

    constructor(vdl: VariableList) {
        super()
        this.vdl = vdl
        vdl.variable.hasType = false
        vdl.variable.hasValue = false
    }

    static load(statement: ts.ForStatement) {
        let vdl = VariableList.load(statement.initializer as ts.VariableDeclarationList)
        let sss = new ForStatement(vdl)
        sss.source = statement
        sss.condition.load(statement.condition as ts.BinaryExpression)
        sss.incrementor.load(statement.incrementor as ts.BinaryExpression)
        sss.block.load(statement.statement as ts.Block)
        return sss
    }

    toNode() {
        let node = ts.createFor(
            this.vdl.toNode(),
            this.condition.toNode(),
            this.incrementor.toNode(),
            this.block.toNode()
        )
        return node
    }
}

export class ForOfStatement extends StatementWithBox {
    readonly isForOf: boolean = true
    readonly vdl: VariableList
    readonly block: Block = new Block(this)
    source: ts.ForOfStatement | null = null

    get item(): Variable {
        return this.vdl.variable
    }

    get list(): ChainBox {
        return this.box
    }

    constructor(vdl: VariableList) {
        super(false)
        this.vdl = vdl
        vdl.variable.hasType = false
        vdl.variable.hasValue = false
    }

    static load(statement: ts.ForOfStatement) {
        let vdl = VariableList.load(statement.initializer as ts.VariableDeclarationList)
        let sss = new ForOfStatement(vdl)
        sss.source = statement
        sss.list.load(statement.expression)
        sss.block.load(statement.statement as ts.Block)
        return sss
    }

    toNode() {
        let node = ts.createForOf(
            undefined,
            this.vdl.toNode(),
            this.list.toNode(),
            this.block.toNode()
        )
        return node
    }
}

export class IfStatement extends StatementWithBox {
    readonly isIf: boolean = true
    hasElse: boolean = true
    readonly block: Block = new Block(this)
    readonly elseBlock: Block = new Block(this)
    source: ts.IfStatement | null = null

    static load(statement: ts.IfStatement) {
        let sss = new IfStatement
        sss.source = statement
        sss.box.load(statement.expression)
        sss.block.load(statement.thenStatement as ts.Block)
        if (statement.elseStatement) {
            sss.elseBlock.load(statement.elseStatement as ts.Block)
        } else {
            sss.hasElse = false
        }
        return sss
    }

    toNode() {
        let elseBlock = undefined
        if (this.hasElse) {
            elseBlock = this.elseBlock.toNode()
        }
        let node = ts.createIf(
            this.box.toNode(),
            this.block.toNode(),
            elseBlock
        )
        return node
    }
}

export class ReturnStatement extends Statement {
    readonly isReturn: boolean = true
    box: ChainBox | null = new ChainBox
    source: ts.ReturnStatement | null = null

    empty() {
        this.box = null
    }

    static load(statement: ts.ReturnStatement) {
        let sss = new ReturnStatement
        sss.source = statement
        if (statement.expression) {
            sss.box!.load(statement.expression)
        }
        return sss
    }

    toNode() {
        let exp = undefined
        if (this.box) {
            exp = this.box.toNode()
        }
        let node = ts.createReturn(exp)
        return node
    }
}

export class SwitchStatement extends StatementWithBox {
    readonly isSwitch: boolean = true
    readonly box: ChainBox = new ChainBox(false)
    readonly block: CaseBlock = new CaseBlock(this)
    source: ts.SwitchStatement | null = null

    static load(statement: ts.SwitchStatement) {
        let sss = new SwitchStatement
        sss.source = statement
        sss.box.load(statement.expression)
        sss.block.load(statement.caseBlock)
        return sss
    }

    toNode() {
        let node = ts.createSwitch(
            this.box.toNode(),
            this.block.toNode()
        )
        return node
    }
}

export class TryStatement extends Statement {
    readonly isTry: boolean = true
    hasFinally: boolean = true
    readonly tryBlock: Block = new Block(this)
    readonly finallyBlock: Block = new Block(this)
    readonly clause: CatchClause
    source: ts.TryStatement | null = null

    constructor(clause: CatchClause) {
        super()
        this.clause = clause
    }

    static load(statement: ts.TryStatement) {
        let clause = CatchClause.load(statement.catchClause!)
        let sss = new TryStatement(clause)
        sss.source = statement
        sss.tryBlock.load(statement.tryBlock)
        if (statement.finallyBlock) {
            sss.finallyBlock.load(statement.finallyBlock)
        } else {
            sss.hasFinally = false
        }
        return sss
    }

    toNode() {
        let finallyBlock = undefined
        if (this.hasFinally) {
            finallyBlock = this.finallyBlock.toNode()
        }
        let node = ts.createTry(
            this.tryBlock.toNode(),
            this.clause.toNode(),
            finallyBlock
        )
        return node
    }
}

export class VariableList {
    readonly variable: Variable
    source: ts.VariableDeclarationList | null = null

    constructor(variable: Variable) {
        this.variable = variable
    }

    static load(vdl: ts.VariableDeclarationList) {
        let variable = Variable.load(vdl.declarations[0])
        let vvv = new VariableList(variable)
        vvv.source = vdl
        return vvv
    }

    toNode() {
        let variable = this.variable.toNode()
        let node = ts.createVariableDeclarationList(
            [variable],
            ts.NodeFlags.Let
        )
        return node
    }
}

export class VariableStatement extends Statement {
    readonly isDefine: boolean = true
    readonly vdl: VariableList
    source: ts.VariableStatement | null = null

    get variable(): Variable {
        return this.vdl.variable
    }

    constructor(vdl: VariableList) {
        super()
        this.vdl = vdl
    }

    static load(statement: ts.VariableStatement) {
        let vdl = VariableList.load(statement.declarationList)
        vdl.variable.modifier.load(statement.modifiers)
        let sss = new VariableStatement(vdl)
        sss.source = statement
        return sss
    }

    toNode() {
        let node = ts.createVariableStatement(
            this.variable.modifier.toNodeArray(),
            this.vdl.toNode()
        )
        return node
    }
}

export class WhileStatement extends StatementWithBox {
    readonly isWhile: boolean = true
    readonly block: Block = new Block(this)
    source: ts.WhileStatement | null = null

    static load(statement: ts.WhileStatement) {
        let sss = new WhileStatement
        sss.source = statement
        sss.box.load(statement.expression)
        sss.block.load(statement.statement as ts.Block)
        return sss
    }

    toNode() {
        let node = ts.createWhile(
            this.box.toNode(),
            this.block.toNode()
        )
        return node
    }
}

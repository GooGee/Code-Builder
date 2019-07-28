import * as ts from 'typescript'
import { CatchClause } from './Clause'
import Block, { CaseBlock } from './Block'
import { Variable } from '../data/Member'
import { StatementNode } from '../Node'
import LineManager from './LineManager'
import { OwnerKind } from '../data/TypeBox'
import Box, { Chain, Assign, Compute } from './Box'

export abstract class Statement implements StatementNode {
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
    abstract toNode(): ts.Statement

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

    static makeVariableList(name: string, list: Array<string>) {
        const variable = Variable.make(name, list, OwnerKind.Variable)
        return new VariableList(variable)
    }
}

export abstract class StatementWithBox extends Statement {
    readonly box: Box

    constructor(box: Box) {
        super()
        this.box = box
    }

}

export class BreakStatement extends Statement {
    readonly label: string = 'Break'
    readonly isSimple: boolean = true
    source: ts.BreakStatement | null = null

    static load(statement: ts.BreakStatement) {
        const sss = new BreakStatement()
        sss.source = statement
        return sss
    }

    toNode() {
        const node = ts.createBreak()
        return node
    }
}

export class ContinueStatement extends Statement {
    readonly label: string = 'Continue'
    readonly isSimple: boolean = true
    source: ts.ContinueStatement | null = null

    static load(statement: ts.ContinueStatement) {
        const sss = new ContinueStatement()
        sss.source = statement
        return sss
    }

    toNode() {
        const node = ts.createContinue()
        return node
    }
}

export class EmptyStatement extends Statement {
    readonly isEmpty: boolean = true
    source: ts.EmptyStatement | null = null

    static load(statement: ts.EmptyStatement) {
        const sss = new EmptyStatement()
        sss.source = statement
        return sss
    }

    toNode() {
        const node = ts.createEmptyStatement()
        return node
    }
}

export class ExpressionStatement {
    static load(statement: ts.ExpressionStatement) {
        if (statement.expression.kind == ts.SyntaxKind.BinaryExpression) {
            const box = Box.load(statement.expression)
            const sss = new AssignStatement(box)
            sss.source = statement
            return sss
        }

        const box = Box.load(statement.expression)
        const sss = new CallStatement(box)
        sss.source = statement
        return sss
    }
}

export class AssignStatement extends StatementWithBox {
    readonly isAssign: boolean = true
    source: ts.ExpressionStatement | null = null

    static make() {
        const box = Box.makeAssign()
        const sss = new AssignStatement(box)
        return sss
    }

    toNode() {
        const node = ts.createExpressionStatement(
            this.box.toNode()
        )
        return node
    }
}

export class CallStatement extends StatementWithBox {
    readonly isCall: boolean = true
    source: ts.ExpressionStatement | null = null

    static make() {
        const box = Box.makeChain()
        const sss = new CallStatement(box)
        return sss
    }

    toNode() {
        const node = ts.createExpressionStatement(
            this.box.toNode()
        )
        return node
    }
}

export class ForStatement extends Statement {
    readonly isFor: boolean = true
    vdl: VariableList
    condition: Compute
    incrementor: Assign
    readonly block: Block = new Block(this)
    source: ts.ForStatement | null = null

    constructor(vdl: VariableList, condition: Compute, incrementor: Assign) {
        super()
        this.vdl = vdl
        vdl.variable.hasType = false
        vdl.variable.hasValue = false
        this.condition = condition
        this.incrementor = incrementor
    }

    get index(): Variable {
        return this.vdl.variable
    }

    get start(): Box {
        return this.index.initializer!
    }

    get end(): Box {
        return this.condition.right
    }

    get step(): Box {
        return this.incrementor.right
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

    static make() {
        const vdl = this.makeVariableList('index', ['number'])
        const start = new Chain
        start.inputNumber(0)
        vdl.variable.initializer = new Box(start)

        const condition = Compute.make()
        const chain = condition.left.BoxItem as Chain
        chain.start(vdl.variable.name)
        condition.operator = ts.SyntaxKind.LessThanToken
        const end = condition.right.BoxItem as Chain
        end.inputNumber(0)

        const incrementor = Assign.make()
        incrementor.left.start(vdl.variable.name)
        const step = incrementor.right.BoxItem as Chain
        step.inputNumber(1)

        const statement = new ForStatement(vdl, condition, incrementor)
        return statement
    }

    static load(statement: ts.ForStatement) {
        const vdl = VariableList.load(statement.initializer as ts.VariableDeclarationList)
        const condition = Compute.load(statement.condition as ts.BinaryExpression)
        const incrementor = Assign.load(statement.incrementor as ts.BinaryExpression)
        const sss = new ForStatement(vdl, condition, incrementor)
        sss.source = statement
        sss.block.load(statement.statement as ts.Block)
        return sss
    }

    toNode() {
        const node = ts.createFor(
            this.vdl.toNode(),
            this.condition.toNode(),
            this.incrementor.toNode(),
            this.block.toNode()
        )
        return node
    }
}

export class ForOfStatement extends Statement {
    readonly isForOf: boolean = true
    readonly chain: Chain
    readonly vdl: VariableList
    readonly block: Block = new Block(this)
    source: ts.ForOfStatement | null = null

    get item(): Variable {
        return this.vdl.variable
    }

    constructor(chain: Chain, vdl: VariableList) {
        super()
        this.chain = chain
        this.vdl = vdl
        vdl.variable.hasType = false
        vdl.variable.hasValue = false
    }

    static make() {
        const vdl = this.makeVariableList('item', ['any'])
        const chain = new Chain(false)
        const statement = new ForOfStatement(chain, vdl)
        return statement
    }

    static load(statement: ts.ForOfStatement) {
        const vdl = VariableList.load(statement.initializer as ts.VariableDeclarationList)
        const chain = new Chain(false)
        chain.load(statement.expression)
        const sss = new ForOfStatement(chain, vdl)
        sss.source = statement
        sss.block.load(statement.statement as ts.Block)
        return sss
    }

    toNode() {
        const node = ts.createForOf(
            undefined,
            this.vdl.toNode(),
            this.chain.toNode(),
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

    static make() {
        const box = Box.makeChain()
        const sss = new IfStatement(box)
        return sss
    }

    static load(statement: ts.IfStatement) {
        const box = Box.load(statement.expression)
        const sss = new IfStatement(box)
        sss.source = statement
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
        const node = ts.createIf(
            this.box.toNode(),
            this.block.toNode(),
            elseBlock
        )
        return node
    }
}

export class ReturnStatement extends Statement {
    readonly isReturn: boolean = true
    box: Box | null = null
    source: ts.ReturnStatement | null = null

    constructor(box: Box | null) {
        super()
        this.box = box
    }

    empty() {
        this.box = null
    }

    addBox() {
        this.box = Box.makeChain()
    }

    static make() {
        const box = Box.makeChain()
        const sss = new ReturnStatement(box)
        return sss
    }

    static load(statement: ts.ReturnStatement) {
        let box = null
        if (statement.expression) {
            box = Box.load(statement.expression)
        }
        const sss = new ReturnStatement(box)
        sss.source = statement
        return sss
    }

    toNode() {
        let exp = undefined
        if (this.box) {
            exp = this.box.toNode()
        }
        const node = ts.createReturn(exp)
        return node
    }
}

export class SwitchStatement extends StatementWithBox {
    readonly isSwitch: boolean = true
    readonly block: CaseBlock = new CaseBlock(this)
    source: ts.SwitchStatement | null = null

    static make() {
        const box = Box.makeChain()
        const sss = new SwitchStatement(box)
        return sss
    }

    static load(statement: ts.SwitchStatement) {
        const box = Box.load(statement.expression, false)
        const sss = new SwitchStatement(box)
        sss.source = statement
        sss.block.load(statement.caseBlock)
        return sss
    }

    toNode() {
        const node = ts.createSwitch(
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

    static make() {
        const vvv = Variable.make('error', ['Error'], OwnerKind.Variable)
        const clause = new CatchClause(vvv)
        const statement = new TryStatement(clause)
        return statement
    }

    static load(statement: ts.TryStatement) {
        const clause = CatchClause.load(statement.catchClause!)
        const sss = new TryStatement(clause)
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
        const node = ts.createTry(
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
        const variable = Variable.load(vdl.declarations[0])
        const vvv = new VariableList(variable)
        vvv.source = vdl
        return vvv
    }

    toNode() {
        const variable = this.variable.toNode()
        const node = ts.createVariableDeclarationList(
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

    static make(name: string, list: Array<string>) {
        const vdl = this.makeVariableList(name, list)
        const statement = new VariableStatement(vdl)
        return statement
    }

    static load(statement: ts.VariableStatement) {
        const vdl = VariableList.load(statement.declarationList)
        vdl.variable.modifier.load(statement.modifiers)
        const sss = new VariableStatement(vdl)
        sss.source = statement
        return sss
    }

    toNode() {
        const node = ts.createVariableStatement(
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

    static make() {
        const box = Box.makeChain()
        const sss = new WhileStatement(box)
        return sss
    }

    static load(statement: ts.WhileStatement) {
        const box = Box.load(statement.expression)
        const sss = new WhileStatement(box)
        sss.source = statement
        sss.block.load(statement.statement as ts.Block)
        return sss
    }

    toNode() {
        const node = ts.createWhile(
            this.box.toNode(),
            this.block.toNode()
        )
        return node
    }
}

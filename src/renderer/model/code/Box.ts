import * as ts from 'typescript'
import * as Expression from './Expression'
import ParameterManager from '../data/ParameterManager'

export default class Box {
    BoxItem: BoxItem

    constructor(BoxItem: BoxItem) {
        this.BoxItem = BoxItem
    }

    get text() {
        return this.BoxItem.text
    }

    static makeAssign() {
        const item = Assign.make()
        const box = new Box(item)
        return box
    }

    static makeChain() {
        const chain = new Chain
        const box = new Box(chain)
        return box
    }

    static makeLambda(argument: ts.Symbol) {
        const lambda = Lambda.make(argument)
        const box = new Box(lambda)
        return box
    }

    static load(node: ts.Expression, canBeConstant: boolean = true) {
        const item = BoxItem.load(node, canBeConstant)
        const box = new Box(item)
        return box
    }

    toNode() {
        return this.BoxItem.toNode()
    }
}

export abstract class BoxItem {
    isChain: boolean = false
    isLambda: boolean = false
    isTwin: boolean = false
    isAssign: boolean = false
    isCompute: boolean = false

    abstract text: string
    abstract toNode(): ts.Expression

    static load(node: ts.Expression, canBeConstant: boolean = true) {
        if (ts.isBinaryExpression(node)) {
            return Twin.load(node)
        }

        if (ts.isArrowFunction(node)) {
            return Lambda.load(node)
        }

        const chain = new Chain(canBeConstant)
        chain.load(node)
        return chain
    }
}

export class Chain extends BoxItem {
    readonly isChain: boolean = true
    readonly canBeConstant: boolean
    root: Expression.Expression

    constructor(canBeConstant: boolean = true) {
        super()
        this.canBeConstant = canBeConstant
        this.root = new Expression.Identifier('this')
    }

    get text(): string {
        return this.root.text
    }

    access(name: string, owner: Expression.Expression) {
        let eee = new Expression.PropertyAccessExpression(owner, name)
        this.root = eee
    }

    call(list: ReadonlyArray<ts.Symbol>, owner: Expression.Expression) {
        let eee = new Expression.CallExpression(owner)
        this.root = eee
        eee.updateArgument(list)
    }

    from(list: Array<string>) {
        this.root = Expression.Expression.from(list)
    }

    input(text: string) {
        if (text == 'null') {
            this.root = new Expression.NullKeyword
            return
        }

        if (text == 'NaN') {
            this.root = new Expression.Identifier(text)
            return
        }

        if (text == 'false') {
            this.root = new Expression.FalseKeyword
            return
        }

        if (text == 'true') {
            this.root = new Expression.TrueKeyword
            return
        }

        if (text == 'this') {
            this.root = new Expression.ThisKeyword
            return
        }
    }

    inputNumber(text: number) {
        let value = Number(text)
        if (isNaN(value)) {
            throw `${text} is not a number!`
        }
        this.root = new Expression.NumericLiteral(value.toString())
    }

    inputString(text: string) {
        this.root = new Expression.StringLiteral(text)
    }

    makeNew(list: ReadonlyArray<ts.Symbol>) {
        let eee = new Expression.NewExpression(this.root)
        this.root = eee
        eee.updateArgument(list)
    }

    not() {
        let eee = new Expression.PrefixUnaryExpression(ts.SyntaxKind.ExclamationToken, this.root)
        this.root = eee
    }

    start(name: string) {
        let eee = new Expression.Identifier(name)
        this.root = eee
    }

    remove(expression: Expression.PropertyAccessExpression) {
        if (expression.expression) {
            this.root = expression.expression
        }
    }

    load(node: ts.Expression) {
        this.root = Expression.Expression.load(node)
    }

    toNode() {
        return this.root.toNode()
    }
}

export class Lambda extends BoxItem {
    readonly isLambda: boolean = true
    readonly ParameterManager: ParameterManager = new ParameterManager(true)
    body: Box
    source: ts.ArrowFunction | null = null

    constructor(body: Box) {
        super()
        this.body = body
    }

    get text(): string {
        const parameter = this.ParameterManager.text
        const value = this.body.text
        return `( ${parameter} ) => ${value}`
    }

    static make(argument: ts.Symbol) {
        const chain = new Chain
        const body = new Box(chain)
        const box = new Lambda(body)
        const declaration = argument.valueDeclaration as ts.ParameterDeclaration
        const type = declaration.type as ts.FunctionTypeNode
        const list = type.parameters.slice().reverse()
        box.ParameterManager.load(list)
        return box
    }

    static load(node: ts.ArrowFunction): Lambda {
        const item = BoxItem.load(node.body as ts.Expression)
        const body = new Box(item)
        const lambda = new Lambda(body)
        lambda.source = node
        lambda.ParameterManager.load(node.parameters)
        return lambda
    }

    toNode() {
        let token = ts.createToken(ts.SyntaxKind.EqualsGreaterThanToken)
        let node = ts.createArrowFunction(
            undefined,
            undefined,
            this.ParameterManager.toNodeArray(),
            undefined,
            token,
            this.body.toNode()
        )
        return node
    }
}

export abstract class Twin extends BoxItem {
    readonly isTwin: boolean = true
    abstract left: Chain | Box
    abstract right: Box
    abstract operator: ts.BinaryOperator

    get text(): string {
        let operator = CompareTokenMap.get(this.operator)
        if (this.isAssign) {
            operator = AssignTokenMap.get(this.operator)
        }
        return `${this.left.text} ${operator} ${this.right.text}`
    }

    static load(node: ts.BinaryExpression) {
        if (AssignTokenMap.get(node.operatorToken.kind)) {
            return Assign.load(node)
        } else {
            return Compute.load(node)
        }
    }

    toNode() {
        let node = ts.createBinary(
            this.left.toNode(),
            this.operator,
            this.right.toNode()
        )
        return node
    }
}

export class Assign extends Twin {
    readonly isAssign: boolean = true
    left: Chain
    right: Box
    operator: ts.AssignmentOperator

    constructor(left: Chain, right: Box, operator: ts.AssignmentOperator) {
        super()
        this.left = left
        this.right = right
        this.operator = operator
    }

    static make() {
        const left = new Chain(false)
        const right = Box.makeChain()
        const item = new Assign(left, right, ts.SyntaxKind.EqualsToken)
        return item
    }

    static load(node: ts.BinaryExpression): Assign {
        const left = new Chain(false)
        left.load(node.left)
        const right = Box.load(node.right)
        const item = new Assign(left, right, node.operatorToken.kind as ts.AssignmentOperator)
        return item
    }
}

export class Compute extends Twin {
    readonly isCompute: boolean = true
    left: Box
    right: Box
    operator: ts.LogicalOperatorOrHigher

    constructor(left: Box, right: Box, operator: ts.LogicalOperatorOrHigher) {
        super()
        this.left = left
        this.right = right
        this.operator = operator
    }

    static make() {
        const left = Box.makeChain()
        const right = Box.makeChain()
        const item = new Compute(left, right, ts.SyntaxKind.EqualsEqualsToken)
        return item
    }

    static load(node: ts.BinaryExpression): Compute {
        const left = Box.load(node.left)
        const right = Box.load(node.right)
        const item = new Compute(left, right, node.operatorToken.kind as ts.LogicalOperatorOrHigher)
        return item
    }
}

const AssignTokenList: ReadonlyArray<[ts.BinaryOperator, string]> = [
    [ts.SyntaxKind.EqualsToken, '='],
    [ts.SyntaxKind.PlusEqualsToken, '+='],
    [ts.SyntaxKind.MinusEqualsToken, '-='],
    [ts.SyntaxKind.AsteriskEqualsToken, '*='],
    [ts.SyntaxKind.SlashEqualsToken, '/='],
]

const CompareTokenList: ReadonlyArray<[ts.BinaryOperator, string]> = [
    [ts.SyntaxKind.EqualsEqualsToken, '=='],
    [ts.SyntaxKind.EqualsEqualsEqualsToken, '==='],
    [ts.SyntaxKind.LessThanEqualsToken, '<='],
    [ts.SyntaxKind.GreaterThanEqualsToken, '>='],
    [ts.SyntaxKind.LessThanToken, '<'],
    [ts.SyntaxKind.GreaterThanToken, '>'],
]

export const AssignTokenMap = new Map<ts.BinaryOperator, string>(AssignTokenList)
export const CompareTokenMap = new Map<ts.BinaryOperator, string>(CompareTokenList)

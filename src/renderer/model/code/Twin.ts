import * as ts from 'typescript'
import Box, { BoxItem } from './Box'
import Chain from './Chain'

export default abstract class Twin extends BoxItem {
    isAssign: boolean = false
    readonly isBinary: boolean = true
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
        const right = Box.make()
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
        const left = Box.make()
        const right = Box.make()
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

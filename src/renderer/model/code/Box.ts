import * as ts from 'typescript'
import Chain from './Chain';

export default abstract class Box {
    isAssign: boolean = false
    isChain: boolean = false
    abstract operator: ts.BinaryOperator

    static load(node: ts.Expression) {
        if (node.kind == ts.SyntaxKind.BinaryExpression) {
            return BinaryBox.load(node as ts.BinaryExpression)
        }

        let box = new ChainBox
        box.load(node)
        return box
    }

    abstract text: string
    abstract load(node: ts.Expression): void
    abstract update(node: ts.Expression): void
    abstract toNode(): ts.Expression
}

export class ChainBox extends Box {
    isChain: boolean = true
    readonly canBeConstant: boolean
    chain: Chain = new Chain
    operator: ts.BinaryOperator = ts.SyntaxKind.CommaToken

    constructor(canBeConstant: boolean = true) {
        super()
        this.canBeConstant = canBeConstant
    }

    get text(): string {
        return this.chain.text
    }

    load(node: ts.Expression) {
        this.chain.load(node)
    }

    update(node: ts.Expression) {
        this.chain.update(node)
    }

    toNode() {
        return this.chain.toNode()
    }
}

export abstract class BinaryBox extends Box {
    isAssign: boolean = false
    abstract left: Box
    abstract right: Box
    abstract operator: ts.BinaryOperator

    get text(): string {
        let operator = CompareMap.get(this.operator)
        if (this.isAssign) {
            operator = AssignMap.get(this.operator)
        }
        return `${this.left.text} ${operator} ${this.right.text}`
    }

    static isAssign(node: ts.BinaryExpression) {
        return AssignList.find(array => {
            if (node.operatorToken.kind == array[0]) {
                return true
            }
            return false
        })
    }

    static load(node: ts.BinaryExpression) {
        let box
        if (BinaryBox.isAssign(node)) {
            box = new AssignBox
        } else {
            box = new ComputeBox
        }
        box.load(node)
        return box
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

export class AssignBox extends BinaryBox {
    readonly isAssign: boolean = true
    readonly left: ChainBox = new ChainBox(false)
    right: ChainBox = new ChainBox
    operator: ts.AssignmentOperator = ts.SyntaxKind.EqualsToken

    load(node: ts.BinaryExpression) {
        this.left.load(node.left)
        this.right.load(node.right)
        this.operator = node.operatorToken.kind as ts.AssignmentOperator
    }

    update(node: ts.BinaryExpression) {
        this.left.update(node.left)
        this.right.update(node.right)
        this.operator = node.operatorToken.kind as ts.AssignmentOperator
    }

}

export class ComputeBox extends BinaryBox {
    left: ChainBox = new ChainBox
    right: ChainBox = new ChainBox
    operator: ts.BinaryOperator = ts.SyntaxKind.PlusToken

    load(node: ts.BinaryExpression) {
        this.left.load(node.left)
        this.right.load(node.right)
        this.operator = node.operatorToken.kind as ts.BitwiseOperatorOrHigher
    }

    update(node: ts.BinaryExpression) {
        this.left.update(node.left)
        this.right.update(node.right)
        this.operator = node.operatorToken.kind as ts.BitwiseOperatorOrHigher
    }

}

const AssignList: ReadonlyArray<[ts.BinaryOperator, string]> = [
    [ts.SyntaxKind.EqualsToken, '='],
    [ts.SyntaxKind.PlusEqualsToken, '+='],
    [ts.SyntaxKind.MinusEqualsToken, '-='],
    [ts.SyntaxKind.AsteriskEqualsToken, '*='],
    [ts.SyntaxKind.SlashEqualsToken, '/='],
]

const CompareList: ReadonlyArray<[ts.BinaryOperator, string]> = [
    [ts.SyntaxKind.EqualsEqualsToken, '=='],
    [ts.SyntaxKind.EqualsEqualsEqualsToken, '==='],
    [ts.SyntaxKind.LessThanEqualsToken, '<='],
    [ts.SyntaxKind.GreaterThanEqualsToken, '>='],
    [ts.SyntaxKind.LessThanToken, '<'],
    [ts.SyntaxKind.GreaterThanToken, '>'],
]

export const AssignMap = new Map<ts.BinaryOperator, string>(AssignList)
export const CompareMap = new Map<ts.BinaryOperator, string>(CompareList)

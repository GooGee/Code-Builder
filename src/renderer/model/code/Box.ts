import * as ts from 'typescript'
import Chain from './Chain'
import ParameterManager from '../data/ParameterManager'

export default abstract class Box {
    isBinary: boolean = false
    isChain: boolean = false
    isLambda: boolean = false

    static load(node: ts.Expression): BinaryBox | ChainBox | LambdaBox {
        if (ts.isBinaryExpression(node)) {
            return BinaryBox.load(node)
        }

        if (ts.isArrowFunction(node)) {
            return LambdaBox.load(node)
        }

        let box = new ChainBox
        box.load(node)
        return box
    }

    abstract text: string
    abstract update(node: ts.Expression): void
    abstract toNode(): ts.Expression
}

export class ChainBox extends Box {
    isChain: boolean = true
    readonly canBeConstant: boolean
    chain: Chain = new Chain

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

export class LambdaBox extends Box {
    isLambda: boolean = true
    readonly ParameterManager: ParameterManager = new ParameterManager(true)
    body: ChainBox | ComputeBox
    source: ts.ArrowFunction | null = null

    constructor(body: ChainBox | ComputeBox) {
        super()
        this.body = body
    }

    get text(): string {
        const parameter = this.ParameterManager.text
        const value = this.body.text
        return `( ${parameter} ) => ${value}`
    }

    static make(argument: ts.Symbol) {
        const declaration = argument.valueDeclaration as ts.ParameterDeclaration
        const type = declaration.type as ts.FunctionTypeNode
        const box = new LambdaBox(new ChainBox)
        const list = type.parameters.slice().reverse()
        box.ParameterManager.load(list)
        return box
    }

    static load(node: ts.ArrowFunction) {
        const body = Box.load(node.body as ts.Expression)
        const lambda = new LambdaBox(body as any)
        lambda.source = node
        lambda.ParameterManager.load(node.parameters)
        return lambda
    }

    update(node: ts.ArrowFunction) {
        this.source = node
        this.ParameterManager.update(node.parameters)
        this.body.update(node.body as any)
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

export abstract class BinaryBox extends Box {
    isAssign: boolean = false
    isBinary: boolean = true
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

import * as ts from 'typescript'
import Project from '../Project'
import ArgumentManager from './ArgumentManager'
import { ExpressionNode } from '../Node'
import Box from './Box'
import Chain from './Chain'
import Lambda from './Lambda'

export abstract class Expression implements ExpressionNode {
    readonly isAccess: boolean = false
    readonly isAssign: boolean = false
    readonly isCall: boolean = false
    readonly isCompute: boolean = false
    readonly isIdentifier: boolean = false
    readonly isKeyword: boolean = false
    readonly isLiteral: boolean = false
    readonly isNew: boolean = false
    readonly isNot: boolean = false
    value: string = ''
    abstract text: string
    abstract source: ts.Node | null

    static from(list: Array<string>) {
        if (list.length == 0) {
            throw 'Error in making Expression'
        }

        let first = true
        let eee: Expression
        list.forEach(name => {
            if (first) {
                first = false
                eee = new Identifier(name)
            } else {
                eee = new PropertyAccessExpression(eee, name)
            }
        })
        return eee!
    }

    static load(node: ts.Expression): Expression {
        if (node.kind == ts.SyntaxKind.Identifier) {
            return Identifier.load(node as ts.Identifier)
        }

        if (node.kind == ts.SyntaxKind.CallExpression) {
            return CallExpression.load(node as ts.CallExpression)
        }

        if (node.kind == ts.SyntaxKind.FalseKeyword) {
            return new FalseKeyword(node)
        }

        if (node.kind == ts.SyntaxKind.NewExpression) {
            return NewExpression.load(node as ts.NewExpression)
        }

        if (node.kind == ts.SyntaxKind.NullKeyword) {
            return new NullKeyword(node)
        }

        if (node.kind == ts.SyntaxKind.NumericLiteral) {
            return NumericLiteral.load(node as ts.NumericLiteral)
        }

        if (node.kind == ts.SyntaxKind.PrefixUnaryExpression) {
            return PrefixUnaryExpression.load(node as ts.PrefixUnaryExpression)
        }

        if (node.kind == ts.SyntaxKind.PropertyAccessExpression) {
            return PropertyAccessExpression.load(node as ts.PropertyAccessExpression)
        }

        if (node.kind == ts.SyntaxKind.StringLiteral) {
            return StringLiteral.load(node as ts.StringLiteral)
        }

        if (node.kind == ts.SyntaxKind.ThisKeyword) {
            return new ThisKeyword(node)
        }

        if (node.kind == ts.SyntaxKind.TrueKeyword) {
            return new TrueKeyword(node)
        }

        throw `Error loading expression: ${node.kind}`
    }

    abstract toNode(): ts.Expression

}

export abstract class Keyword extends Expression {
    readonly isKeyword: boolean = true
    source: ts.Node | null

    constructor(source: ts.Node | null = null) {
        super()
        this.source = source
    }

    get text(): string {
        return this.value
    }
}

export class FalseKeyword extends Keyword {
    readonly value: string = 'false'

    toNode() {
        return ts.createFalse()
    }
}

export class NullKeyword extends Keyword {
    readonly value: string = 'null'

    toNode() {
        return ts.createNull()
    }
}

export class ThisKeyword extends Keyword {
    readonly value: string = 'this'

    toNode() {
        return ts.createThis()
    }
}

export class TrueKeyword extends Keyword {
    readonly value: string = 'true'

    toNode() {
        return ts.createTrue()
    }
}

export abstract class ExpressionWithArgument extends Expression {
    readonly ArgumentManager: ArgumentManager = new ArgumentManager

    updateArgument(list: ReadonlyArray<ts.Symbol>) {
        this.ArgumentManager.clear()
        list.forEach(argument => {
            const parameter = argument.valueDeclaration
            if (ts.isParameter(parameter)) {
                if (parameter.type) {
                    if (ts.isFunctionTypeNode(parameter.type)) { // Lambda
                        const lambda = Lambda.make(argument)
                        const box = new Box(lambda)
                        this.ArgumentManager.add(box)
                        return
                    }
                }
            }

            const chain = new Chain
            const box = new Box(chain)
            this.ArgumentManager.add(box)
        })
    }
}

export class CallExpression extends ExpressionWithArgument {
    readonly isCall: boolean = true
    readonly expression: Expression
    source: ts.CallExpression | null = null

    constructor(expression: Expression) {
        super()
        this.expression = expression
    }

    get text(): string {
        return `${this.expression.text} ( ${this.ArgumentManager.text} )`
    }

    static load(node: ts.CallExpression) {
        let expression = Expression.load(node.expression)
        let eee = new CallExpression(expression)
        eee.source = node
        eee.ArgumentManager.load(node.arguments)
        return eee
    }

    toNode() {
        let node = ts.createCall(
            this.expression.toNode(),
            undefined,
            this.ArgumentManager.toNodeArray()
        )
        return node
    }
}

export class Identifier extends Expression {
    readonly isIdentifier: boolean = true
    source: ts.Identifier | null = null

    get text(): string {
        return this.value
    }

    constructor(name: string) {
        super()
        this.value = name
    }

    static load(node: ts.Identifier) {
        let eee = new Identifier(node.text)
        eee.source = node
        return eee
    }

    toNode() {
        return ts.createIdentifier(this.value)
    }
}

export class NewExpression extends ExpressionWithArgument {
    readonly isNew: boolean = true
    readonly expression: Expression
    source: ts.NewExpression | null = null

    constructor(expression: Expression) {
        super()
        this.expression = expression
    }

    get text(): string {
        return `${this.expression.text} ( ${this.ArgumentManager.text} )`
    }

    static load(node: ts.NewExpression) {
        let child = Expression.load(node.expression)
        let eee = new NewExpression(child)
        eee.source = node
        eee.ArgumentManager.load(node.arguments)
        return eee
    }

    toNode() {
        let node = ts.createNew(
            this.expression.toNode(),
            undefined,
            this.ArgumentManager.toNodeArray()
        )
        return node
    }
}

export abstract class Literal extends Expression {
    readonly isLiteral: boolean = true

    get text(): string {
        return this.value
    }
}

export class NumericLiteral extends Literal {
    source: ts.NumericLiteral | null = null

    constructor(value: string) {
        super()
        this.value = value
    }

    static load(node: ts.NumericLiteral) {
        let eee = new NumericLiteral(node.text)
        eee.source = node
        return eee
    }

    toNode() {
        let node = ts.createNumericLiteral(this.text)
        return node
    }
}

export class PrefixUnaryExpression extends Expression {
    readonly isNot: boolean = true
    operator: ts.PrefixUnaryOperator
    readonly operand: Expression
    source: ts.PrefixUnaryExpression | null = null

    constructor(operator: ts.PrefixUnaryOperator, operand: Expression) {
        super()
        this.operator = operator
        this.operand = operand
    }

    get text(): string {
        return this.operand.text
    }

    get expression() {
        return this.operand
    }

    static load(node: ts.PrefixUnaryExpression) {
        let operand = Expression.load(node.operand)
        let eee = new PrefixUnaryExpression(node.operator, operand)
        eee.source = node
        return eee
    }

    toNode() {
        let node = ts.createPrefix(
            this.operator,
            this.operand.toNode()
        )
        return node
    }
}

export class PropertyAccessExpression extends Expression {
    readonly isAccess: boolean = true
    readonly expression: Expression
    source: ts.PropertyAccessExpression | null = null

    get text(): string {
        return `${this.expression.text} ${Project.PointSign} ${this.value}`
    }

    constructor(expression: Expression, name: string) {
        super()
        this.expression = expression
        this.value = name
    }

    static load(node: ts.PropertyAccessExpression) {
        let expression = Expression.load(node.expression)
        let eee = new PropertyAccessExpression(expression, node.name.text)
        eee.source = node
        return eee
    }

    toNode() {
        let node = ts.createPropertyAccess(
            this.expression.toNode(),
            this.value
        )
        return node
    }
}

export class StringLiteral extends Literal {
    value: string
    source: ts.StringLiteral | null = null

    get text(): string {
        return `\`${this.value}\``
    }

    constructor(value: string) {
        super()
        this.value = value
    }

    static load(node: ts.StringLiteral) {
        let eee = new StringLiteral(node.text)
        eee.source = node
        return eee
    }

    toNode() {
        let node = ts.createStringLiteral(this.value)
        return node
    }
}

import * as ts from 'typescript'
import * as Expression from './Expression'

export default class Chain {
    readonly canBeConstant: boolean
    root: Expression.Expression

    constructor(canBeConstant: boolean = true) {
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

import * as ts from 'typescript'
import Box, { BoxItem } from './Box'
import Chain from './Chain'
import ParameterManager from '../data/ParameterManager'

export default class Lambda extends BoxItem {
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

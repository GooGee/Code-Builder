import * as ts from 'typescript'
import Node from '../Node'
import TypeChain from './TypeChain'
import Block from '../code/Block'
import { ChainBox, ComputeBox } from '../code/Box'
import GenericManager from './GenericManager'
import ParameterManager from './ParameterManager'
import ModifierManager from './ModifierManager'

export default class Lambda implements Node {
    type: TypeChain
    readonly modifier: ModifierManager = new ModifierManager
    readonly ParameterManager: ParameterManager = new ParameterManager
    readonly GenericManager: GenericManager = new GenericManager
    body: Block | ChainBox | ComputeBox
    source: ts.ArrowFunction | null = null

    constructor(type: TypeChain) {
        this.type = type
        this.body = new ChainBox
    }

    makeBlock() {
        this.body = new Block(this)
        return this.body
    }

    makeBox() {
        this.body = new ChainBox
        return this.body
    }

    makeCompare() {
        this.body = new ComputeBox
        return this.body
    }

    loadBody(body: ts.ConciseBody) {
        if (ts.isBlock(body)) {
            let block = this.makeBlock()
            block.load(body)
            return
        }

        if (ts.isBinaryExpression(body)) {
            let box = this.makeCompare()
            box.load(body)
            return
        }

        let box = this.makeBox()
        box.load(body)
    }

    updateBody(body: ts.ConciseBody) {
        if (ts.isBlock(body)) {
            let block = this.body as Block
            block.update(body)
            return
        }

        if (ts.isBinaryExpression(body)) {
            let box = this.body as ComputeBox
            box.update(body)
            return
        }

        let box = this.body as ChainBox
        box.update(body)
    }

    static load(node: ts.ArrowFunction) {
        let type = TypeChain.load(node.type)
        let lambda = new Lambda(type)
        lambda.source = node
        lambda.modifier.load(node.modifiers)
        lambda.ParameterManager.load(node.parameters)
        lambda.GenericManager.load(node.typeParameters)
        lambda.loadBody(node.body)
        return lambda
    }

    update(node: ts.ArrowFunction) {
        this.source = node
        if (node.type) {
            this.type.update(node.type)
        }
        this.ParameterManager.update(node.parameters)
        this.GenericManager.update(node.typeParameters)
        this.updateBody(node.body)
    }

    toNode() {
        let token = ts.createToken(ts.SyntaxKind.EqualsGreaterThanToken)
        let node = ts.createArrowFunction(
            this.modifier.toNodeArray(),
            this.GenericManager.toNodeArray(),
            this.ParameterManager.toNodeArray(),
            this.type.toNode(),
            token,
            this.body.toNode()
        )
        return node
    }
}

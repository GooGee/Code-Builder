import * as ts from 'typescript'
import Twin from './Twin'
import Chain from './Chain'
import Lambda from './Lambda'

export default class Box {
    BoxItem: BoxItem

    constructor(BoxItem: BoxItem) {
        this.BoxItem = BoxItem
    }

    get text() {
        return this.BoxItem.text
    }

    static make() {
        const chain = new Chain
        const box = new Box(chain)
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
    isBinary: boolean = false
    isChain: boolean = false
    isLambda: boolean = false

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

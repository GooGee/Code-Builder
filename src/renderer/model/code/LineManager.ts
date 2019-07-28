import * as ts from 'typescript'
import Line from "./Line"
import Manager from "../Manager"
import { BlockBase } from './Block'

export default class LineManager extends Manager<Line> {
    readonly block: BlockBase

    constructor(block: BlockBase) {
        super()
        this.block = block
    }

    make() {
        return new Line(this.block)
    }

    load(list: ReadonlyArray<ts.Statement>) {
        list.forEach(statement => {
            const line = this.make()
            line.load(statement)
            this.add(line)
        })
    }

    toNodeArray() {
        const list: ts.Statement[] = []
        this.list.forEach(line => {
            if (line.statement) {
                list.push(line.toNode())
            }
        })
        return list
    }

}

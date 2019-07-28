import * as ts from 'typescript'
import Manager from '../Manager'
import Box from './Box'

export default class ArgumentManager extends Manager<Box> {

    get text(): string {
        let list: Array<string> = []
        this.list.forEach(argument => {
            list.push(argument.text)
        })
        return list.join(', ')
    }

    load(list?: ReadonlyArray<ts.Expression>) {
        if (list) {
            list.forEach(expression => {
                let box = Box.load(expression)
                this.add(box)
            })
        }
    }

    toNodeArray() {
        let list: ts.Expression[] = []
        this.list.forEach(box => {
            list.push(box.toNode())
        })
        return list
    }

}

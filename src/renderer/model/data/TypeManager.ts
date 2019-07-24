import * as ts from 'typescript'
import Manager, { BracketKind } from "../Manager"
import TypeBox, { OwnerKind } from './TypeBox'

export default class TypeManager extends Manager<TypeBox> {
    kind: OwnerKind

    constructor(OwnerKind: OwnerKind) {
        super()
        this.kind = OwnerKind
    }

    get text(): string {
        return this.getText()
    }

    getText(separator: string = ', ', bracket: BracketKind = BracketKind.None) {
        const list: Array<string> = []
        this.list.forEach(item => list.push(item.text))
        const text = list.join(separator)
        return this.addBracket(text, bracket)
    }

    addBracket(text: string, bracket: BracketKind = BracketKind.Pointy) {
        switch (bracket) {
            case BracketKind.Curly:
                return `{ ${text} }`
                break

            case BracketKind.Pointy:
                return `< ${text} >`
                break

            case BracketKind.Round:
                return `( ${text} )`
                break

            case BracketKind.Square:
                return `[ ${text} ]`
                break

            default:
                return text
                break
        }
    }

    makeExpressionType(list: Array<string>) {
        return TypeBox.makeExpressionType(list)
    }

    load(list?: ReadonlyArray<ts.TypeNode>) {
        if (list) {
            list.forEach(node => {
                const te = TypeBox.load(node, this.kind)
                this.add(te)
            })
        }
    }

    toNodeArray() {
        const list: Array<ts.TypeNode> = []
        this.list.forEach(item => {
            list.push(item.toNode())
        })
        return list
    }
}

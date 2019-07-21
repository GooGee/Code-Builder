import * as ts from 'typescript'
import TypeBox from './TypeBox'
import Name from './Name'

export default class Generic extends Name {
    constraint: TypeBox | null = null
    source: ts.TypeParameterDeclaration | null = null

    get text() {
        if (this.constraint) {
            return `${this.name} Extend ${this.constraint.text}`
        }
        return this.name
    }

    addConstraint() {
        this.constraint = TypeBox.make('Object')
    }

    removeConstraint() {
        this.constraint = null
    }

    static load(node: ts.TypeParameterDeclaration) {
        let ppp = new Generic(node.name.text)
        if (node.constraint) {
            ppp.constraint = TypeBox.load(node.constraint)
        }
        return ppp
    }

    update(node: ts.TypeParameterDeclaration) {
        this.source = node
        if (node.constraint) {
            this.constraint!.update(node.constraint)
        }
    }

    toNode() {
        let ccc = undefined
        if (this.constraint) {
            ccc = this.constraint.toNode()
        }
        let node = ts.createTypeParameterDeclaration(
            this.name,
            ccc,
            undefined
        )
        return node
    }
}

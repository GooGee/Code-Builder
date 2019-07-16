import * as ts from 'typescript'
import TypeNode from './TypeNode'
import Name from './Name'

export default class Generic extends Name {
    constraint: TypeNode | null = null
    source: ts.TypeParameterDeclaration | null = null

    static load(node: ts.TypeParameterDeclaration) {
        let ppp = new Generic(node.name.text)
        if (node.constraint) {
            ppp.constraint = TypeNode.load(node.constraint)
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

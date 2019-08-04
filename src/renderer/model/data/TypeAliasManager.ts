import * as ts from 'typescript'
import Manager from "../Manager"
import TypeAlias from './TypeAlias'
import TypeBox, { OwnerKind } from './TypeBox'
import { UnionType } from './TypeNode'

export default class TypeAliasManager extends Manager<TypeAlias> {

    make(name: string) {
        const type = new UnionType
        type.TypeManager.add(TypeBox.make(['number'], OwnerKind.Function))
        type.TypeManager.add(TypeBox.make(['string'], OwnerKind.Function))
        const box = new TypeBox(type, OwnerKind.Function)
        const ta = new TypeAlias(name, box)
        return ta
    }

    load(list: Array<ts.TypeAliasDeclaration>) {
        list.forEach(node => {
            const ta = TypeAlias.load(node)
            this.add(ta)
        })
    }

    update(list: Array<ts.TypeAliasDeclaration>) {
        this.clear()
        this.load(list)
    }

    toNodeArray() {
        const list: Array<ts.TypeAliasDeclaration> = []
        this.list.forEach(ta => {
            list.push(ta.toNode())
        })
        return list
    }
}
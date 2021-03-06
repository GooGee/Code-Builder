import ts from 'typescript'
import Transformer from './Transformer'

function addNode(
    parent: ts.EnumDeclaration,
    item: ts.EnumMember,
    at?: ts.EnumMember,
) {
    const list = Transformer.insert<ts.EnumMember>(parent.members, item, at)
    update(parent, list)
}

function update(parent: ts.EnumDeclaration, list: ts.NodeArray<ts.EnumMember>) {
    const to = ts.factory.updateEnumDeclaration(
        parent,
        parent.decorators,
        parent.modifiers,
        parent.name,
        list,
    )
    Transformer.replace(parent, to)
}

export default {
    addNode,
}

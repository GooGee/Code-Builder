import ts from 'typescript'
import Transformer from './Transformer'

function addNote(
    parent: ts.InterfaceDeclaration,
    item: ts.TypeElement,
    at?: ts.TypeElement,
) {
    const list = Transformer.insert<ts.TypeElement>(parent.members, item, at)
    update(parent, list)
}

function update(
    parent: ts.InterfaceDeclaration,
    list: ts.NodeArray<ts.TypeElement>,
) {
    const to = ts.factory.updateInterfaceDeclaration(
        parent,
        parent.decorators,
        parent.modifiers,
        parent.name,
        parent.typeParameters,
        parent.heritageClauses,
        list,
    )
    Transformer.transform(parent, to)
}

export default {
    addNote,
}

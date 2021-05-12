import ts from 'typescript'
import Transformer from './Transformer'

function addNote(
    parent: ts.ClassDeclaration,
    item: ts.ClassElement,
    at?: ts.ClassElement,
) {
    const list = Transformer.insert<ts.ClassElement>(parent.members, item, at)
    update(parent, list)
}

function deleteNote(parent: ts.ClassDeclaration, item: ts.ClassElement) {
    const list = Transformer.remove<ts.ClassElement>(parent.members, item)
    update(parent, list)
}

function update(
    parent: ts.ClassDeclaration,
    list: ts.NodeArray<ts.ClassElement>,
) {
    const to = ts.factory.updateClassDeclaration(
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
    deleteNote,
}
import ts from 'typescript'
import Transformer from './Transformer'

function addNode(
    parent: ts.ClassDeclaration,
    item: ts.ClassElement,
    at?: ts.ClassElement,
) {
    const list = Transformer.insert<ts.ClassElement>(parent.members, item, at)
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
    Transformer.replace(parent, to)
}

const ClassTransformer = {
    addNode,
}

export default ClassTransformer

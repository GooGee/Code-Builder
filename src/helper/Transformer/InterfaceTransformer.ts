import ts from 'typescript'
import Transformer from './Transformer'

function addNode(
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
    Transformer.replace(parent, to)
}

const InterfaceTransformer = {
    addNode,
}

export default InterfaceTransformer

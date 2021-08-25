import ts from 'typescript'
import Transformer from './Transformer'

function addNode(
    parent: ts.ClassLikeDeclaration,
    item: ts.ClassElement,
    at?: ts.ClassElement,
) {
    const list = Transformer.insert<ts.ClassElement>(parent.members, item, at)
    Transformer.setProperty(parent, list, 'members')
}

function addNodeList(
    parent: ts.ClassLikeDeclaration,
    itemxx: ts.ClassElement[],
    at?: ts.ClassElement,
) {
    const list = Transformer.insertMany<ts.ClassElement>(
        parent.members,
        itemxx,
        at,
    )
    Transformer.setProperty(parent, list, 'members')
}

const ClassTransformer = {
    addNode,
    addNodeList,
}

export default ClassTransformer

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

const ClassTransformer = {
    addNode,
}

export default ClassTransformer

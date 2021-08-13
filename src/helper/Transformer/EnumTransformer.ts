import ts from 'typescript'
import Transformer from './Transformer'

function addNode(
    parent: ts.EnumDeclaration,
    item: ts.EnumMember,
    at?: ts.EnumMember,
) {
    const list = Transformer.insert<ts.EnumMember>(parent.members, item, at)
    Transformer.setProperty(parent, list, 'members')
}

const EnumTransformer = {
    addNode,
}

export default EnumTransformer

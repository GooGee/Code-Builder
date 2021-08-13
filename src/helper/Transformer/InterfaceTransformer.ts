import ts from 'typescript'
import Transformer from './Transformer'

function addNode(
    parent: ts.InterfaceDeclaration,
    item: ts.TypeElement,
    at?: ts.TypeElement,
) {
    const list = Transformer.insert<ts.TypeElement>(parent.members, item, at)
    Transformer.setProperty(parent, list, 'members')
}

const InterfaceTransformer = {
    addNode,
}

export default InterfaceTransformer

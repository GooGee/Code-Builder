import ts from 'typescript'
import Transformer from './Transformer'

function addNode(
    parent: ts.SignatureDeclarationBase,
    node: ts.ParameterDeclaration,
    at?: ts.ParameterDeclaration,
) {
    const list = Transformer.insert<ts.ParameterDeclaration>(
        parent.parameters,
        node,
        at,
    )
    Transformer.setProperty(parent, list, 'parameters')
}

const ParameterTransformer = { addNode }

export default ParameterTransformer

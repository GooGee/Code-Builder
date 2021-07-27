import ts from 'typescript'
import { makeParameter } from '../Factory/DeclarationFactory'
import Transformer from './Transformer'

function addNode(
    parent: ts.SignatureDeclarationBase,
    at?: ts.ParameterDeclaration,
) {
    const value = prompt('Enter a name')
    if (value === null) {
        return
    }
    const node = makeParameter(value)
    const list = Transformer.insert<ts.ParameterDeclaration>(
        parent.parameters,
        node,
        at,
    )
    Transformer.setProperty(parent, list, 'parameters')
}

const ParameterTransformer = { addNode }

export default ParameterTransformer

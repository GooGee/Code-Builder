import ts from 'typescript'
import { makeParameter } from '../Factory/DeclarationFactory'
import InputTool from '../InputTool'
import Transformer from './Transformer'

function addNode(
    parent: ts.SignatureDeclarationBase,
    at?: ts.ParameterDeclaration,
) {
    try {
        const text = InputTool.inputName()
        if (text === null) {
            return
        }
        const node = makeParameter(text)
        const list = Transformer.insert<ts.ParameterDeclaration>(
            parent.parameters,
            node,
            at,
        )
        Transformer.setProperty(parent, list, 'parameters')
    } catch (error) {
        if (error.message) {
            window.alert(error.message)
        } else {
            window.alert(error)
        }
    }
}

const ParameterTransformer = { addNode }

export default ParameterTransformer

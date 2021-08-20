import ts from 'typescript'
import InputTool from '../InputTool'
import Transformer from './Transformer'

function addNode(
    parent:
        | ts.ClassDeclaration
        | ts.InterfaceDeclaration
        | ts.FunctionDeclaration
        | ts.MethodDeclaration
        | ts.MethodSignature
        | ts.TypeAliasDeclaration,
    at?: ts.TypeParameterDeclaration,
) {
    try {
        const text = InputTool.inputName()
        if (text === null) {
            return
        }
        const node = ts.factory.createTypeParameterDeclaration(text)
        let list: ts.NodeArray<ts.TypeParameterDeclaration> =
            ts.factory.createNodeArray([node])
        if (parent.typeParameters) {
            if (parent.typeParameters.length) {
                list = Transformer.insert<ts.TypeParameterDeclaration>(
                    parent.typeParameters,
                    node,
                    at,
                )
            }
        }
        Transformer.setProperty(parent, list, 'typeParameters')
    } catch (error) {
        if (error.message) {
            window.alert(error.message)
        } else {
            window.alert(error)
        }
    }
}

const TypeParameterTransformer = {
    addNode,
}

export default TypeParameterTransformer

import ts from 'typescript'
import { makeArrowFunction, makeParameter } from './DeclarationFactory'

function makeArgument(node: ts.ParameterDeclaration) {
    if (node.type === undefined) {
        return ts.factory.createNull()
    }

    const type = node.type
    if (ts.isFunctionTypeNode(type)) {
        return makeDeclaration(type)
    }

    return ts.factory.createNull()
}

function makeArgumentList(nodexx: readonly ts.ParameterDeclaration[]) {
    const list: ts.Expression[] = new Array(nodexx.length)
    for (let index = 0; index < nodexx.length; index++) {
        list[index] = makeArgument(nodexx[index])
    }
    return list
}

function makeDeclaration(type: ts.FunctionTypeNode) {
    const parameters = new Array<ts.ParameterDeclaration>()
    if (type.parameters.length) {
        type.parameters.forEach((item) => {
            parameters.push(makeParameter(item.name.getText()))
        })
    }
    // const typeParameters = new Array<ts.TypeParameterDeclaration>()
    // if (type.typeParameters) {
    //     type.typeParameters.forEach((item) => {
    //         typeParameters.push(
    //             ts.factory.createTypeParameterDeclaration(item.name.getText()),
    //         )
    //     })
    // }
    return makeArrowFunction([], parameters)
}

const ArgumentFactory = {
    makeArgument,
    makeArgumentList,
}

export default ArgumentFactory

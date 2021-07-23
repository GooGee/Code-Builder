import ts from 'typescript'

function makeTypeArgument(node: ts.TypeParameterDeclaration) {
    if (node.constraint) {
        // todo
    }
    return ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
}

function makeTypeArgumentList(nodexx: readonly ts.TypeParameterDeclaration[]) {
    const list: ts.TypeNode[] = new Array(nodexx.length)
    for (let index = 0; index < nodexx.length; index++) {
        list[index] = makeTypeArgument(nodexx[index])
    }
    return list
}

const TypeArgumentFactory = {
    makeTypeArgument,
    makeTypeArgumentList,
}

export default TypeArgumentFactory

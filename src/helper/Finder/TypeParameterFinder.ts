import ts from 'typescript'

function getTypeParameterList(node: ts.Node) {
    const list = new Array<ts.TypeParameterDeclaration>()
    traversal(node, list)
    return list
}

function traversal(node: ts.Node, list: ts.TypeParameterDeclaration[]) {
    if (ts.isSourceFile(node)) {
        return
    }

    traversal(node.parent, list)

    if (
        ts.isClassLike(node) ||
        ts.isFunctionLike(node) ||
        ts.isInterfaceDeclaration(node)
    ) {
        if (node.typeParameters) {
            node.typeParameters.forEach((item) => {
                list.push(item)
            })
        }
    }
}

const TypeParameterFinder = {
    getTypeParameterList,
}

export default TypeParameterFinder

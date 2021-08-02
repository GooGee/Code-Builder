import ts from 'typescript'

function findParameter(node: ts.Node, list: Array<ts.ParameterDeclaration>) {
    if (ts.isSourceFile(node)) {
        return
    }
    if (ts.isFunctionLike(node)) {
        list.push(...node.parameters)
    }
    findParameter(node.parent, list)
}

function getParameterList(node: ts.Node) {
    const list = new Array<ts.ParameterDeclaration>()
    findParameter(node, list)
    return list
}

const Finder = {
    getParameterList,
}

export default Finder

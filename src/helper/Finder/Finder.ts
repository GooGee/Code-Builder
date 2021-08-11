import ts from 'typescript'

function getClassList(node: ts.Node) {
    const list = new Array<ts.ClassDeclaration>()
    Finder.traversal(node, (statement) => {
        if (ts.isClassDeclaration(statement)) {
            list.push(statement)
        }
    })
    return list
}

function getEnumList(node: ts.Node) {
    const list = new Array<ts.EnumDeclaration>()
    Finder.traversal(node, (statement) => {
        if (ts.isEnumDeclaration(statement)) {
            list.push(statement)
        }
    })
    return list
}

function getInterfaceList(node: ts.Node) {
    const list = new Array<ts.InterfaceDeclaration>()
    Finder.traversal(node, (statement) => {
        if (ts.isInterfaceDeclaration(statement)) {
            list.push(statement)
        }
    })
    return list
}

function traversal(node: ts.Node, cb: CallBack) {
    if (ts.isSourceFile(node)) {
        node.statements.forEach(cb)
        return
    }
    traversal(node.parent, cb)
    if (ts.isBlock(node)) {
        node.statements.forEach(cb)
        return
    }
}

interface CallBack {
    (node: ts.Node): void
}

const Finder = {
    getClassList,
    getEnumList,
    getInterfaceList,
    traversal,
}

export default Finder

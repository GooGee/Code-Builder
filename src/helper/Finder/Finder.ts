import ts from 'typescript'

function getClassList(node: ts.Node) {
    const list = new Array<ts.ClassDeclaration>()
    traversal(node, node, (statement) => {
        if (ts.isClassDeclaration(statement)) {
            list.push(statement)
        }
        return true
    })
    return list
}

function getEnumList(node: ts.Node) {
    const list = new Array<ts.EnumDeclaration>()
    traversal(node, node, (statement) => {
        if (ts.isEnumDeclaration(statement)) {
            list.push(statement)
        }
        return true
    })
    return list
}

function getInterfaceList(node: ts.Node) {
    const list = new Array<ts.InterfaceDeclaration>()
    traversal(node, node, (statement) => {
        if (ts.isInterfaceDeclaration(statement)) {
            list.push(statement)
        }
        return true
    })
    return list
}

function getTypeAliasList(node: ts.Node) {
    const list = new Array<ts.TypeAliasDeclaration>()
    traversal(node, node, (statement) => {
        if (ts.isTypeAliasDeclaration(statement)) {
            list.push(statement)
        }
        return true
    })
    return list
}

function traversal(node: ts.Node, child: ts.Node, cb: CallBack) {
    if (ts.isSourceFile(node)) {
        search(node.statements)
        return
    }
    traversal(node.parent, node, cb)
    if (ts.isBlock(node)) {
        search(node.statements)
    }

    function search(statements: ts.NodeArray<ts.Statement>) {
        statements.every((statement) => {
            if (Object.is(statement, child)) {
                return false
            }
            return cb(statement)
        })
    }
}

interface CallBack {
    (node: ts.Node): boolean
}

const Finder = {
    getClassList,
    getEnumList,
    getInterfaceList,
    getTypeAliasList,
    traversal,
}

export default Finder

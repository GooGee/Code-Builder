import ts from 'typescript'

function getClassList(node: ts.Node) {
    const list = new Array<ts.ClassDeclaration>()
    traversal(node, node, (statement) => {
        if (ts.isClassDeclaration(statement)) {
            list.push(statement)
        }
        return true
    })
    return list.sort((aaa, bbb) => {
        const aname = aaa.name?.text
        const bname = bbb.name?.text
        if (aname === undefined) {
            return -1
        }
        if (bname === undefined) {
            return 1
        }
        return aname.localeCompare(bname)
    })
}

function getEnumList(node: ts.Node) {
    const list = new Array<ts.EnumDeclaration>()
    traversal(node, node, (statement) => {
        if (ts.isEnumDeclaration(statement)) {
            list.push(statement)
        }
        return true
    })
    return list.sort((aaa, bbb) =>
        aaa.name.getText().localeCompare(bbb.name.getText()),
    )
}

function getFunctionList(node: ts.Node) {
    const list = new Array<ts.FunctionDeclaration>()
    traversal(node, node, (statement) => {
        if (ts.isFunctionDeclaration(statement)) {
            list.push(statement)
        }
        return true
    })
    return list.sort((aaa, bbb) => {
        const aname = aaa.name?.text
        const bname = bbb.name?.text
        if (aname === undefined) {
            return -1
        }
        if (bname === undefined) {
            return 1
        }
        return aname.localeCompare(bname)
    })
}

function getInterfaceList(node: ts.Node) {
    const list = new Array<ts.InterfaceDeclaration>()
    traversal(node, node, (statement) => {
        if (ts.isInterfaceDeclaration(statement)) {
            list.push(statement)
        }
        return true
    })
    return list.sort((aaa, bbb) =>
        aaa.name.getText().localeCompare(bbb.name.getText()),
    )
}

function getTypeAliasList(node: ts.Node) {
    const list = new Array<ts.TypeAliasDeclaration>()
    traversal(node, node, (statement) => {
        if (ts.isTypeAliasDeclaration(statement)) {
            list.push(statement)
        }
        return true
    })
    return list.sort((aaa, bbb) =>
        aaa.name.getText().localeCompare(bbb.name.getText()),
    )
}

function inClass(node: ts.Node): boolean {
    if (ts.isSourceFile(node)) {
        return false
    }

    if (ts.isClassLike(node)) {
        return true
    }

    return inClass(node.parent)
}

function inFunction(node: ts.Node): boolean {
    if (ts.isSourceFile(node)) {
        return false
    }

    if (ts.isFunctionLike(node)) {
        return true
    }

    return inFunction(node.parent)
}

function isLoop(node: ts.Node) {
    if (ts.isDoStatement(node)) {
        return true
    }
    if (ts.isForInStatement(node)) {
        return true
    }
    if (ts.isForOfStatement(node)) {
        return true
    }
    if (ts.isForStatement(node)) {
        return true
    }
    if (ts.isWhileStatement(node)) {
        return true
    }
    return false
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

    function search(statements: ts.NodeArray<ts.Node>) {
        const position = statements.indexOf(child)
        statements.every((statement, index) => {
            if (index > position) {
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
    getFunctionList,
    getInterfaceList,
    getTypeAliasList,
    inClass,
    inFunction,
    isLoop,
    traversal,
}

export default Finder

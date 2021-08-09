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

function findVariable(
    node: ts.Node,
    child: ts.Node,
    list: Array<ts.VariableDeclaration>,
) {
    if (ts.isSourceFile(node)) {
        find(node.statements)
        return
    }
    findVariable(node.parent, node, list)
    if (ts.isBlock(node)) {
        find(node.statements)
        return
    }
    if (ts.isForInStatement(node)) {
        if (ts.isVariableDeclarationList(node.initializer)) {
            add(node.initializer)
        }
        return
    }
    if (ts.isForOfStatement(node)) {
        if (ts.isVariableDeclarationList(node.initializer)) {
            add(node.initializer)
        }
        return
    }
    if (ts.isForStatement(node)) {
        if (node.initializer) {
            if (ts.isVariableDeclarationList(node.initializer)) {
                add(node.initializer)
            }
        }
        return
    }
    if (ts.isTryStatement(node)) {
        if (node.catchClause) {
            if (node.catchClause.variableDeclaration) {
                list.push(node.catchClause.variableDeclaration)
            }
        }
        return
    }

    function add(vdl: ts.VariableDeclarationList) {
        vdl.declarations.forEach((item) => {
            list.push(item)
        })
    }
    function find(statements: ts.NodeArray<ts.Statement>) {
        statements.every((statement) => {
            if (Object.is(statement, child)) {
                return false
            }
            if (ts.isVariableStatement(statement)) {
                add(statement.declarationList)
            }
            return true
        })
    }
}

function getVariableList(node: ts.Node) {
    const list = new Array<ts.VariableDeclaration>()
    findVariable(node, node, list)
    return list
}

const Finder = {
    getParameterList,
    getVariableList,
}

export default Finder

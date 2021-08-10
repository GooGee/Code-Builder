import ts from 'typescript'

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
    function find(statementxx: ts.NodeArray<ts.Statement>) {
        statementxx.every((statement) => {
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

const VariableFinder = {
    getVariableList,
}

export default VariableFinder

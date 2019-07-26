import * as ts from 'typescript'

export default interface Node {
    source: ts.Node | null

    toNode(): ts.Node
}

export interface ExpressionNode extends Node {

    toNode(): ts.Expression
}

export interface StatementNode extends Node {

    toNode(): ts.Statement
}

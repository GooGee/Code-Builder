import React, { ReactElement } from 'react'
import ts from 'typescript'
import FunctionDeclaration from '../declaration/FunctionDeclaration'
import TypeAliasDeclaration from '../declaration/TypeAliasDeclaration'
import DoStatement from './DoStatement'
import EmptyStatement from './EmptyStatement'
import ExportAssignment from './ExportAssignment'
import ExpressionStatement from './ExpressionStatement'
import ForInStatement from './ForInStatement'
import ForOfStatement from './ForOfStatement'
import ForStatement from './ForStatement'
import IfStatement from './IfStatement'
import KeywordStatement from './KeywordStatement'
import ReturnStatement from './ReturnStatement'
import SwitchStatement from './SwitchStatement'
import ThrowStatement from './ThrowStatement'
import TryStatement from './TryStatement'
import VariableStatement from './VariableStatement'
import WhileStatement from './WhileStatement'

interface Props {
    editing: boolean
    node: ts.Statement
}

export default function Statement({ editing, node }: Props): ReactElement {
    if (ts.isFunctionDeclaration(node)) {
        return (
            <FunctionDeclaration
                editing={editing}
                node={node}
            ></FunctionDeclaration>
        )
    }
    if (ts.isTypeAliasDeclaration(node)) {
        return (
            <TypeAliasDeclaration
                editing={editing}
                node={node}
            ></TypeAliasDeclaration>
        )
    }

    switch (node.kind) {
        case ts.SyntaxKind.BreakStatement:
        case ts.SyntaxKind.ContinueStatement:
            return <KeywordStatement node={node as any}></KeywordStatement>

        case ts.SyntaxKind.DoStatement:
            return (
                <DoStatement editing={editing} node={node as any}></DoStatement>
            )

        case ts.SyntaxKind.EmptyStatement:
            return <EmptyStatement node={node as any}></EmptyStatement>

        case ts.SyntaxKind.ExportAssignment:
            return (
                <ExportAssignment
                    editing={editing}
                    node={node as any}
                ></ExportAssignment>
            )

        case ts.SyntaxKind.ExpressionStatement:
            return (
                <ExpressionStatement
                    editing={editing}
                    node={node as any}
                ></ExpressionStatement>
            )

        case ts.SyntaxKind.ForInStatement:
            return (
                <ForInStatement
                    editing={editing}
                    node={node as any}
                ></ForInStatement>
            )

        case ts.SyntaxKind.ForOfStatement:
            return (
                <ForOfStatement
                    editing={editing}
                    node={node as any}
                ></ForOfStatement>
            )

        case ts.SyntaxKind.ForStatement:
            return (
                <ForStatement
                    editing={editing}
                    node={node as any}
                ></ForStatement>
            )

        case ts.SyntaxKind.IfStatement:
            return (
                <IfStatement editing={editing} node={node as any}></IfStatement>
            )

        case ts.SyntaxKind.ReturnStatement:
            return (
                <ReturnStatement
                    editing={editing}
                    node={node as any}
                ></ReturnStatement>
            )

        case ts.SyntaxKind.SwitchStatement:
            return (
                <SwitchStatement
                    editing={editing}
                    node={node as any}
                ></SwitchStatement>
            )

        case ts.SyntaxKind.ThrowStatement:
            return (
                <ThrowStatement
                    editing={editing}
                    node={node as any}
                ></ThrowStatement>
            )

        case ts.SyntaxKind.TryStatement:
            return (
                <TryStatement
                    editing={editing}
                    node={node as any}
                ></TryStatement>
            )

        case ts.SyntaxKind.VariableStatement:
            return (
                <VariableStatement
                    editing={editing}
                    node={node as any}
                ></VariableStatement>
            )

        case ts.SyntaxKind.WhileStatement:
            return (
                <WhileStatement
                    editing={editing}
                    node={node as any}
                ></WhileStatement>
            )

        default:
            break
    }

    throw new Error(
        `Error loading statement: ${node.kind}-${ts.SyntaxKind[node.kind]}`,
    )
}

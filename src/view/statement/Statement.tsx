import React, { ReactElement } from 'react'
import ts from 'typescript'
import Declaration from '../declaration/Declaration'
import DoStatement from './DoStatement'
import EmptyStatement from './EmptyStatement'
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
    node: ts.Statement
}

export default function Statement({ node }: Props): ReactElement {
    if (ts.isTypeAliasDeclaration(node)) {
        return <Declaration node={node as any}></Declaration>
    }

    switch (node.kind) {
        case ts.SyntaxKind.BreakStatement:
        case ts.SyntaxKind.ContinueStatement:
            return <KeywordStatement node={node as any}></KeywordStatement>

        case ts.SyntaxKind.DoStatement:
            return <DoStatement node={node as any}></DoStatement>

        case ts.SyntaxKind.EmptyStatement:
            return <EmptyStatement node={node as any}></EmptyStatement>

        case ts.SyntaxKind.ExpressionStatement:
            return (
                <ExpressionStatement node={node as any}></ExpressionStatement>
            )

        case ts.SyntaxKind.ForInStatement:
            return <ForInStatement node={node as any}></ForInStatement>

        case ts.SyntaxKind.ForOfStatement:
            return <ForOfStatement node={node as any}></ForOfStatement>

        case ts.SyntaxKind.ForStatement:
            return <ForStatement node={node as any}></ForStatement>

        case ts.SyntaxKind.IfStatement:
            return <IfStatement node={node as any}></IfStatement>

        case ts.SyntaxKind.ReturnStatement:
            return <ReturnStatement node={node as any}></ReturnStatement>

        case ts.SyntaxKind.SwitchStatement:
            return <SwitchStatement node={node as any}></SwitchStatement>

        case ts.SyntaxKind.ThrowStatement:
            return <ThrowStatement node={node as any}></ThrowStatement>

        case ts.SyntaxKind.TryStatement:
            return <TryStatement node={node as any}></TryStatement>

        case ts.SyntaxKind.VariableStatement:
            return <VariableStatement node={node as any}></VariableStatement>

        case ts.SyntaxKind.WhileStatement:
            return <WhileStatement node={node as any}></WhileStatement>

        default:
            break
    }

    throw new Error(
        `Error loading statement: ${node.kind}-${ts.SyntaxKind[node.kind]}`,
    )
}

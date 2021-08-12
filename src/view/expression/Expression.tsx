import React, { ReactElement } from 'react'
import ts from 'typescript'
import ArrowFunction from '../declaration/ArrowFunction'
import ArrayLiteralExpression from './ArrayLiteralExpression'
import AsExpression from './AsExpression'
import BinaryExpression from './BinaryExpression'
import CallExpression from './CallExpression'
import DeleteExpression from './DeleteExpression'
import ElementAccessExpression from './ElementAccessExpression'
import ExpressionWithTypeArguments from './ExpressionWithTypeArguments'
import IdentifierExpression from './IdentifierExpression'
import KeywordExpression from './KeywordExpression'
import LiteralExpression from './LiteralExpression'
import NewExpression from './NewExpression'
import ObjectLiteralExpression from './ObjectLiteralExpression'
import ParenthesizedExpression from './ParenthesizedExpression'
import PostfixUnaryExpression from './PostfixUnaryExpression'
import PrefixUnaryExpression from './PrefixUnaryExpression'
import PropertyAccessExpression from './PropertyAccessExpression'
import TypeOfExpression from './TypeOfExpression'

interface Props {
    editing?: boolean
    node: ts.Expression
}

export default function Expression({
    editing = false,
    node,
}: Props): ReactElement | null {
    if (node === undefined) {
        return null
    }

    switch (node.kind) {
        case ts.SyntaxKind.ArrayLiteralExpression:
            return (
                <ArrayLiteralExpression
                    node={node as any}
                ></ArrayLiteralExpression>
            )

        case ts.SyntaxKind.ArrowFunction:
            return <ArrowFunction node={node as any}></ArrowFunction>

        case ts.SyntaxKind.AsExpression:
            return <AsExpression node={node as any}></AsExpression>

        case ts.SyntaxKind.BinaryExpression:
            return (
                <BinaryExpression
                    editing={editing}
                    node={node as any}
                ></BinaryExpression>
            )

        case ts.SyntaxKind.CallExpression:
            return <CallExpression node={node as any}></CallExpression>

        case ts.SyntaxKind.DeleteExpression:
            return <DeleteExpression node={node as any}></DeleteExpression>

        case ts.SyntaxKind.ElementAccessExpression:
            return (
                <ElementAccessExpression
                    node={node as any}
                ></ElementAccessExpression>
            )

        case ts.SyntaxKind.FalseKeyword:
        case ts.SyntaxKind.NullKeyword:
        case ts.SyntaxKind.SuperKeyword:
        case ts.SyntaxKind.ThisKeyword:
        case ts.SyntaxKind.TrueKeyword:
        case ts.SyntaxKind.UndefinedKeyword:
        case ts.SyntaxKind.VoidKeyword:
            return <KeywordExpression node={node}></KeywordExpression>

        case ts.SyntaxKind.ExpressionWithTypeArguments:
            return (
                <ExpressionWithTypeArguments
                    node={node as any}
                ></ExpressionWithTypeArguments>
            )

        case ts.SyntaxKind.Identifier:
            return (
                <IdentifierExpression node={node as any}></IdentifierExpression>
            )

        case ts.SyntaxKind.NewExpression:
            return <NewExpression node={node as any}></NewExpression>

        case ts.SyntaxKind.NumericLiteral:
        case ts.SyntaxKind.StringLiteral:
            return <LiteralExpression node={node as any}></LiteralExpression>

        case ts.SyntaxKind.ObjectLiteralExpression:
            return (
                <ObjectLiteralExpression
                    node={node as any}
                ></ObjectLiteralExpression>
            )

        case ts.SyntaxKind.ParenthesizedExpression:
            return (
                <ParenthesizedExpression
                    editing={editing}
                    node={node as any}
                ></ParenthesizedExpression>
            )

        case ts.SyntaxKind.PostfixUnaryExpression:
            return (
                <PostfixUnaryExpression
                    node={node as any}
                ></PostfixUnaryExpression>
            )

        case ts.SyntaxKind.PrefixUnaryExpression:
            return (
                <PrefixUnaryExpression
                    node={node as any}
                ></PrefixUnaryExpression>
            )

        case ts.SyntaxKind.PropertyAccessExpression:
            return (
                <PropertyAccessExpression
                    node={node as any}
                ></PropertyAccessExpression>
            )

        case ts.SyntaxKind.TypeOfExpression:
            return <TypeOfExpression node={node as any}></TypeOfExpression>

        default:
            break
    }

    throw new Error(
        `Error loading expression: ${node.kind}-${ts.SyntaxKind[node.kind]}`,
    )
}

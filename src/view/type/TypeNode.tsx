import React, { ReactElement } from 'react'
import ts from 'typescript'
import ExpressionWithTypeArguments from '../expression/ExpressionWithTypeArguments'
import ArrayType from './ArrayType'
import KeywordType from './KeywordType'
import TypeReference from './TypeReference'
import UnionType from './UnionType'

interface Props {
    node: ts.TypeNode | undefined
}

export default function TypeNode({ node }: Props): ReactElement | null {
    if (node === undefined) {
        return null
    }

    if (ts.isArrayTypeNode(node)) {
        return <ArrayType node={node}></ArrayType>
    }

    if (ts.isExpressionWithTypeArguments(node)) {
        return (
            <ExpressionWithTypeArguments
                node={node}
            ></ExpressionWithTypeArguments>
        )
    }

    if (ts.isTypeReferenceNode(node)) {
        return <TypeReference node={node}></TypeReference>
    }

    if (ts.isUnionTypeNode(node)) {
        return <UnionType node={node}></UnionType>
    }

    const list = [
        ts.SyntaxKind.BooleanKeyword,
        ts.SyntaxKind.NullKeyword,
        ts.SyntaxKind.NumberKeyword,
        ts.SyntaxKind.StringKeyword,
        ts.SyntaxKind.UndefinedKeyword,
        ts.SyntaxKind.VoidKeyword,
    ]
    if (list.includes(node.kind)) {
        return <KeywordType node={node as any}></KeywordType>
    }

    throw new Error(`Error loading type: ${ts.SyntaxKind[node.kind]}`)
}

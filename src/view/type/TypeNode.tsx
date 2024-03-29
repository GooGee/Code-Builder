import React, { ReactElement } from 'react'
import ts from 'typescript'
import KeywordTypeList from '../../asset/KeywordTypeList'
import ArrayType from './ArrayType'
import ExpressionType from './ExpressionType'
import KeywordType from './KeywordType'
import LiteralType from './LiteralType'
import ParenthesizedType from './ParenthesizedType'
import TypeReference from './TypeReference'
import UnionType from './UnionType'

interface Props {
    node: ts.TypeNode
}

export default function TypeNode({ node }: Props): ReactElement | null {
    if (ts.isArrayTypeNode(node)) {
        return <ArrayType node={node}></ArrayType>
    }

    if (ts.isExpressionWithTypeArguments(node)) {
        return <ExpressionType node={node}></ExpressionType>
    }

    if (ts.isLiteralTypeNode(node)) {
        return <LiteralType node={node}></LiteralType>
    }

    if (ts.isParenthesizedTypeNode(node)) {
        return <ParenthesizedType node={node}></ParenthesizedType>
    }

    if (ts.isTypeReferenceNode(node)) {
        return <TypeReference node={node}></TypeReference>
    }

    if (ts.isUnionTypeNode(node)) {
        return <UnionType node={node}></UnionType>
    }

    if (KeywordTypeList.includes(node.kind as any)) {
        return <KeywordType node={node as any}></KeywordType>
    }

    throw new Error(`Error loading type: ${ts.SyntaxKind[node.kind]}`)
}

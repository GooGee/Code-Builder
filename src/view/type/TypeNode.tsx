import React, { ReactElement } from 'react'
import ts from 'typescript'
import KeywordTypeList from '../../asset/KeywordTypeList'
import ExpressionWithTypeArguments from '../expression/ExpressionWithTypeArguments'
import ArrayType from './ArrayType'
import KeywordType from './KeywordType'
import LiteralType from './LiteralType'
import TypeReference from './TypeReference'
import UnionType from './UnionType'

interface Props {
    editing: boolean
    node?: ts.TypeNode
}

export default function TypeNode({
    editing,
    node,
}: Props): ReactElement | null {
    if (node === undefined) {
        return null
    }

    if (ts.isArrayTypeNode(node)) {
        return <ArrayType editing={editing} node={node}></ArrayType>
    }

    if (ts.isExpressionWithTypeArguments(node)) {
        return (
            <ExpressionWithTypeArguments
                node={node}
            ></ExpressionWithTypeArguments>
        )
    }

    if (ts.isLiteralTypeNode(node)) {
        return <LiteralType node={node}></LiteralType>
    }

    if (ts.isTypeReferenceNode(node)) {
        return <TypeReference editing={editing} node={node}></TypeReference>
    }

    if (ts.isUnionTypeNode(node)) {
        return <UnionType editing={editing} node={node}></UnionType>
    }

    if (KeywordTypeList.includes(node.kind as any)) {
        return <KeywordType node={node as any}></KeywordType>
    }

    throw new Error(`Error loading type: ${ts.SyntaxKind[node.kind]}`)
}

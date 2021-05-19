import React, { ReactElement } from 'react'
import ts from 'typescript'
import KeywordTypeList from '../../asset/KeywordTypeList'
import ExpressionWithTypeArguments from '../expression/ExpressionWithTypeArguments'
import ArrayType from './ArrayType'
import KeywordType from './KeywordType'
import LiteralType from './LiteralType'
import TypeReference from './TypeReference'
import TypeRoot from './TypeRoot'
import UnionType from './UnionType'

interface Props {
    node?: ts.TypeNode
    parent: ts.Node
    propertyName?: string
}

export default function TypeNodeEditing({
    node,
    parent,
    propertyName = 'type',
}: Props): ReactElement {
    function getNode() {
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

        if (ts.isLiteralTypeNode(node)) {
            return <LiteralType node={node}></LiteralType>
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

    return (
        <TypeRoot node={node} parent={parent} propertyName={propertyName}>
            {getNode()}
        </TypeRoot>
    )
}

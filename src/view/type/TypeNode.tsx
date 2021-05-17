import React, { ReactElement } from 'react'
import ts from 'typescript'
import KeywordTypeList from '../../asset/KeywordTypeList'
import { UpdateTypeNode } from '../../helper/Menu/TypeMenuFactory'
import ExpressionWithTypeArguments from '../expression/ExpressionWithTypeArguments'
import ArrayType from './ArrayType'
import KeywordType from './KeywordType'
import LiteralType from './LiteralType'
import TypeReference from './TypeReference'
import TypeRoot from './TypeRoot'
import UnionType from './UnionType'

interface Props {
    editing?: boolean
    node: ts.TypeNode | undefined
    updateType?: UpdateTypeNode
}

export default function TypeNode({
    editing,
    node,
    updateType = (tn: ts.TypeNode) => {},
}: Props): ReactElement | null {
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
        <TypeRoot editing={editing} node={node} updateType={updateType}>
            {getNode()}
        </TypeRoot>
    )
}

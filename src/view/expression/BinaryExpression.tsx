import React, { ReactElement } from 'react'
import ts from 'typescript'
import ComputeToken from '../text/ComputeToken'
import ExpressionRoot from './ExpressionRoot'

interface Props {
    editing: boolean
    node: ts.BinaryExpression
}

export default function BinaryExpression({
    editing,
    node,
}: Props): ReactElement {
    return (
        <span>
            <ExpressionRoot node={node.left} parent={node}></ExpressionRoot>{' '}
            <ComputeToken token={node.operatorToken}></ComputeToken>{' '}
            <ExpressionRoot node={node.right} parent={node}></ExpressionRoot>
        </span>
    )
}

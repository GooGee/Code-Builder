import React, { ReactElement } from 'react'
import ts from 'typescript'
import ComputeToken from '../text/ComputeToken'
import Expression from './Expression'
import ExpressionRootEdit from './ExpressionRootEdit'

interface Props {
    editing: boolean
    node: ts.BinaryExpression
}

export default function BinaryExpression({
    editing,
    node,
}: Props): ReactElement {
    if (editing) {
        return (
            <span>
                <ExpressionRootEdit
                    node={node.left}
                    parent={node}
                    propertyName="left"
                ></ExpressionRootEdit>{' '}
                <ComputeToken token={node.operatorToken}></ComputeToken>{' '}
                <ExpressionRootEdit
                    node={node.right}
                    parent={node}
                    propertyName="right"
                ></ExpressionRootEdit>
            </span>
        )
    }

    return (
        <span>
            <Expression node={node.left}></Expression>{' '}
            <ComputeToken token={node.operatorToken}></ComputeToken>{' '}
            <Expression node={node.right}></Expression>
        </span>
    )
}

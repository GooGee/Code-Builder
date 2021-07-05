import React, { ReactElement } from 'react'
import ts from 'typescript'
import EditingView from '../control/EditingView'
import ComputeToken from '../text/ComputeToken'
import Token from '../text/Token'
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
            <EditingView
                viewFactory={(editing) => (
                    <ComputeToken
                        editing={editing}
                        token={node.operatorToken}
                    ></ComputeToken>
                )}
            ></EditingView>{' '}
            <ExpressionRoot node={node.right} parent={node}></ExpressionRoot>
        </span>
    )
}

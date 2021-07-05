import React, { ReactElement } from 'react'
import ts from 'typescript'
import EditingView from '../control/EditingView'
import AssignToken from '../text/AssignToken'
import ExpressionRoot from './ExpressionRoot'

interface Props {
    node: ts.BinaryExpression
}

export default function Assign({ node }: Props): ReactElement {
    return (
        <span>
            <ExpressionRoot
                isLeft={true}
                node={node.left}
                parent={node}
            ></ExpressionRoot>{' '}
            <EditingView
                viewFactory={(editing) => (
                    <AssignToken
                        editing={editing}
                        token={node.operatorToken}
                    ></AssignToken>
                )}
            ></EditingView>{' '}
            <ExpressionRoot node={node.right} parent={node}></ExpressionRoot>
        </span>
    )
}

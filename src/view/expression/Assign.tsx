import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import AssignToken from '../text/AssignToken'
import ExpressionRoot from './ExpressionRoot'
import ExpressionRootEdit from './ExpressionRootEdit'

interface Props {
    node: ts.BinaryExpression
}

export default function Assign({ node }: Props): ReactElement {
    const [editing, setEditing] = useState(false)
    return (
        <span
            onMouseEnter={(event) => setEditing(true)}
            onMouseLeave={(event) => setEditing(false)}
        >
            {editing ? (
                <ExpressionRootEdit
                    isLeft={true}
                    node={node.left}
                    parent={node}
                    propertyName="left"
                ></ExpressionRootEdit>
            ) : (
                <ExpressionRoot
                    isLeft={true}
                    node={node.left}
                    parent={node}
                    propertyName="left"
                ></ExpressionRoot>
            )}{' '}
            <AssignToken token={node.operatorToken}></AssignToken>{' '}
            {editing ? (
                <ExpressionRootEdit
                    node={node.right}
                    parent={node}
                    propertyName="right"
                ></ExpressionRootEdit>
            ) : (
                <ExpressionRoot
                    node={node.right}
                    parent={node}
                    propertyName="right"
                ></ExpressionRoot>
            )}
        </span>
    )
}

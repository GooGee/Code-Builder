import React, { ReactElement } from 'react'
import ts from 'typescript'
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
                propertyName="left"
            ></ExpressionRoot>{' '}
            <AssignToken token={node.operatorToken}></AssignToken>{' '}
            <ExpressionRoot
                node={node.right}
                parent={node}
                propertyName="right"
            ></ExpressionRoot>
        </span>
    )
}

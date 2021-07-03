import React, { ReactElement } from 'react'
import ts from 'typescript'
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
            <ExpressionRoot
                node={node.left}
                parent={node}
            ></ExpressionRoot>{' '}
            <Token kind={node.operatorToken.kind}></Token>{' '}
            <ExpressionRoot
                node={node.right}
                parent={node}
            ></ExpressionRoot>
        </span>
    )
}

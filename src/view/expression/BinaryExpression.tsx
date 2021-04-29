import React, { ReactElement } from 'react'
import ts from 'typescript'
import Token from '../text/Token'
import ExpressionRoot from './ExpressionRoot'

interface Props {
    node: ts.BinaryExpression
}

export default function BinaryExpression({ node }: Props): ReactElement {
    return (
        <span>
            <ExpressionRoot node={node.left}></ExpressionRoot>{' '}
            <Token kind={node.operatorToken.kind}></Token>{' '}
            <ExpressionRoot node={node.right}></ExpressionRoot>
        </span>
    )
}

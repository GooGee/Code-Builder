import React, { ReactElement } from 'react'
import ts from 'typescript'
import Token from '../text/Token'
import ExpressionRoot from './ExpressionRoot'

interface Props {
    node: ts.BinaryExpression
}

export default function Assign({ node }: Props): ReactElement {
    return (
        <span>
            <ExpressionRoot node={node.left} isLeft={true}></ExpressionRoot>{' '}
            <Token kind={node.operatorToken.kind}></Token>{' '}
            <ExpressionRoot node={node.right}></ExpressionRoot>
        </span>
    )
}

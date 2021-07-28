import React, { ReactElement } from 'react'
import ts from 'typescript'
import Token from '../text/Token'
import ExpressionRoot from './ExpressionRoot'

interface Props {
    node: ts.PostfixUnaryExpression
}

export default function PostfixUnaryExpression({ node }: Props): ReactElement {
    return (
        <span>
            <ExpressionRoot
                node={node.operand}
                parent={node}
                propertyName="operand"
            ></ExpressionRoot>
            <Token kind={node.operator}></Token>
        </span>
    )
}

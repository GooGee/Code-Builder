import React, { ReactElement } from 'react'
import ts from 'typescript'
import Token from '../text/Token'
import ExpressionRoot from './ExpressionRoot'

interface Props {
    node: ts.PrefixUnaryExpression
}

export default function PrefixUnaryExpression({ node }: Props): ReactElement {
    return (
        <span>
            <Token kind={node.operator}></Token>
            <ExpressionRoot
                node={node.operand}
                parent={node}
                propertyName="operand"
            ></ExpressionRoot>
        </span>
    )
}

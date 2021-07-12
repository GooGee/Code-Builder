import React, { ReactElement } from 'react'
import ts from 'typescript'
import Token from '../text/Token'
import Expression from './Expression'

interface Props {
    node: ts.PostfixUnaryExpression
}

export default function PostfixUnaryExpression({ node }: Props): ReactElement {
    return (
        <span>
            <Expression node={node.operand}></Expression>
            <Token kind={node.operator}></Token>
        </span>
    )
}

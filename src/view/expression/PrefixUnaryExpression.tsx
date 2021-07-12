import React, { ReactElement } from 'react'
import ts from 'typescript'
import Token from '../text/Token'
import Expression from './Expression'

interface Props {
    node: ts.PrefixUnaryExpression
}

export default function PrefixUnaryExpression({ node }: Props): ReactElement {
    return (
        <span>
            <Token kind={node.operator}></Token>
            <Expression node={node.operand}></Expression>
        </span>
    )
}

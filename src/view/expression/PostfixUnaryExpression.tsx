import React, { ReactElement } from 'react'
import ts from 'typescript'
import Token from '../text/Token'
import Expression from './Expression'

interface Props {
    editing: boolean
    node: ts.PostfixUnaryExpression
}

export default function PostfixUnaryExpression({
    editing,
    node,
}: Props): ReactElement {
    return (
        <span>
            <Expression editing={editing} node={node.operand}></Expression>
            <Token kind={node.operator}></Token>
        </span>
    )
}

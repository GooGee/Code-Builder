import React, { ReactElement } from 'react'
import ts from 'typescript'
import Token from '../text/Token'
import Expression from './Expression'

interface Props {
    editing: boolean
    node: ts.PrefixUnaryExpression
}

export default function PrefixUnaryExpression({
    editing,
    node,
}: Props): ReactElement {
    return (
        <span>
            <Token kind={node.operator}></Token>
            <Expression editing={editing} node={node.operand}></Expression>
        </span>
    )
}

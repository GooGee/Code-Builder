import React, { ReactElement } from 'react'
import ts from 'typescript'
import Expression from './Expression'

interface Props {
    editing: boolean
    node: ts.ParenthesizedExpression
}

export default function ParenthesizedExpression({
    editing,
    node,
}: Props): ReactElement {
    return (
        <span>
            (<Expression editing={editing} node={node.expression}></Expression>)
        </span>
    )
}

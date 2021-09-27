import React, { ReactElement } from 'react'
import ts from 'typescript'
import Expression from './Expression'

interface Props {
    editing: boolean
    node: ts.ParenthesizedExpression
    root: ts.Expression
}

export default function ParenthesizedExpression({
    editing,
    node,
    root,
}: Props): ReactElement {
    return (
        <span>
            (
            <Expression
                editing={editing}
                node={node.expression}
                root={root}
            ></Expression>
            )
        </span>
    )
}

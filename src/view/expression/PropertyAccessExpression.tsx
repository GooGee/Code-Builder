import React, { ReactElement } from 'react'
import ts from 'typescript'
import Expression from './Expression'
import Identifier from './Identifier'

interface Props {
    editing: boolean
    node: ts.PropertyAccessExpression
}

export default function PropertyAccessExpression({
    editing,
    node,
}: Props): ReactElement {
    return (
        <span>
            <Expression editing={editing} node={node.expression}></Expression>
            {'.'}
            <Identifier editing={editing} node={node.name}></Identifier>
        </span>
    )
}

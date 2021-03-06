import React, { ReactElement } from 'react'
import ts from 'typescript'
import Expression from './Expression'
import IdentifierExpression from './IdentifierExpression'

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
            <IdentifierExpression
                editing={editing}
                node={node.name as any}
            ></IdentifierExpression>
        </span>
    )
}

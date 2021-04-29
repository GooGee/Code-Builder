import React, { ReactElement } from 'react'
import ts from 'typescript'
import Expression from './Expression'
import Identifier from './Identifier'

interface Props {
    node: ts.PropertyAccessExpression
}

export default function PropertyAccessExpression({
    node,
}: Props): ReactElement {
    return (
        <span>
            <Expression node={node.expression}></Expression>
            {'.'}
            <Identifier node={node.name}></Identifier>
        </span>
    )
}

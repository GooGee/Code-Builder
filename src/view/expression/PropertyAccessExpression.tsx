import React, { ReactElement } from 'react'
import ts from 'typescript'
import Dot from '../text/Dot'
import Expression from './Expression'

interface Props {
    node: ts.PropertyAccessExpression
    root: ts.Expression
}

export default function PropertyAccessExpression({
    node,
    root,
}: Props): ReactElement {
    return (
        <span>
            <Expression node={node.expression} root={root}></Expression>
            <Dot></Dot>
            <Expression node={node.name as any} root={root}></Expression>
        </span>
    )
}

import React, { ReactElement } from 'react'
import ts from 'typescript'
import Expression from './Expression'
import ExpressionRoot from './ExpressionRoot'

interface Props {
    node: ts.ElementAccessExpression
    root: ts.Expression
}

export default function ElementAccessExpression({
    node,
    root,
}: Props): ReactElement {
    return (
        <span>
            <Expression node={node.expression} root={root}></Expression>[
            <ExpressionRoot
                node={node.argumentExpression}
                parent={node}
                propertyName="argumentExpression"
            ></ExpressionRoot>
            ]
        </span>
    )
}

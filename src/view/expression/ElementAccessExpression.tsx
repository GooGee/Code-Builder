import React, { ReactElement } from 'react'
import ts from 'typescript'
import Expression from './Expression'
import ExpressionRoot from './ExpressionRoot'

interface Props {
    node: ts.ElementAccessExpression
}

export default function ElementAccessExpression({ node }: Props): ReactElement {
    return (
        <span>
            <Expression node={node.expression}></Expression>[
            <ExpressionRoot
                node={node.argumentExpression}
                parent={node}
                propertyName="argumentExpression"
            ></ExpressionRoot>
            ]
        </span>
    )
}

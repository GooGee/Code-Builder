import React, { ReactElement } from 'react'
import ts from 'typescript'
import TypeArgumentxx from '../type/TypeArgumentxx'
import Expression from './Expression'

interface Props {
    node: ts.ExpressionWithTypeArguments
    root: ts.Expression
}

export default function ExpressionWithTypeArguments({
    node,
    root,
}: Props): ReactElement {
    return (
        <span>
            <Expression node={node.expression} root={root}></Expression>
            <TypeArgumentxx
                list={node.typeArguments}
                parent={node}
            ></TypeArgumentxx>
        </span>
    )
}

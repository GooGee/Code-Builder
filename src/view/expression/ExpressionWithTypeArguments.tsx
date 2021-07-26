import React, { ReactElement } from 'react'
import ts from 'typescript'
import TypeArgumentxx from '../type/TypeArgumentxx'
import Expression from './Expression'

interface Props {
    node: ts.ExpressionWithTypeArguments
}

export default function ExpressionWithTypeArguments({
    node,
}: Props): ReactElement {
    return (
        <span>
            <Expression node={node.expression}></Expression>
            <TypeArgumentxx
                list={node.typeArguments}
                parent={node}
            ></TypeArgumentxx>
        </span>
    )
}

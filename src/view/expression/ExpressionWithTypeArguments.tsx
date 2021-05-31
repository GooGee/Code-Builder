import React, { ReactElement } from 'react'
import ts from 'typescript'
import TypeArgumentxx from '../type/TypeArgumentxx'
import Expression from './Expression'

interface Props {
    editing: boolean
    node: ts.ExpressionWithTypeArguments
}

export default function ExpressionWithTypeArguments({
    editing = false,
    node,
}: Props): ReactElement {
    return (
        <span>
            <Expression editing={editing} node={node.expression}></Expression>
            <TypeArgumentxx editing={editing} list={node.typeArguments}></TypeArgumentxx>
        </span>
    )
}

import React, { ReactElement } from 'react'
import ts from 'typescript'
import Assign from '../expression/Assign'
import ExpressionRoot from '../expression/ExpressionRoot'

interface Props {
    editing: boolean
    node: ts.ExpressionStatement
}

export default function ExpressionStatement({
    editing,
    node,
}: Props): ReactElement {
    if (ts.isBinaryExpression(node.expression)) {
        return <Assign editing={editing} node={node.expression}></Assign>
    }
    return (
        <ExpressionRoot
            editing={editing}
            node={node.expression}
            parent={node}
        ></ExpressionRoot>
    )
}

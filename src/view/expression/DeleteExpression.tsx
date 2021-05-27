import React, { ReactElement } from 'react'
import ts from 'typescript'
import Keyword from '../text/Keyword'
import ExpressionRoot from './ExpressionRoot'

interface Props {
    editing: boolean
    node: ts.DeleteExpression
}

export default function DeleteExpression({
    editing,
    node,
}: Props): ReactElement {
    return (
        <span>
            <Keyword kind={node.kind}></Keyword>{' '}
            <ExpressionRoot
                editing={editing}
                node={node.expression}
                parent={node}
            ></ExpressionRoot>
        </span>
    )
}

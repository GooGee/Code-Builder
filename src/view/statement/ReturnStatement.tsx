import React, { ReactElement } from 'react'
import ts from 'typescript'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    editing: boolean
    node: ts.ReturnStatement
}

export default function ReturnStatement({
    editing,
    node,
}: Props): ReactElement {
    return (
        <div>
            <Keyword kind={node.kind}></Keyword>{' '}
            <ExpressionRoot
                editing={editing}
                node={node.expression}
                parent={node}
            ></ExpressionRoot>
        </div>
    )
}

import React, { ReactElement } from 'react'
import ts from 'typescript'
import Keyword from '../text/Keyword'
import TypeNode from '../type/TypeNode'
import ExpressionRoot from './ExpressionRoot'

interface Props {
    editing: boolean
    node: ts.AsExpression
}

export default function AsExpression({ editing, node }: Props): ReactElement {
    return (
        <span>
            <ExpressionRoot
                editing={editing}
                node={node.expression}
                parent={node}
            ></ExpressionRoot>{' '}
            <Keyword kind={node.kind}></Keyword>{' '}
            <TypeNode node={node.type}></TypeNode>
        </span>
    )
}

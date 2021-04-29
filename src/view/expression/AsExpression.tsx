import React, { ReactElement } from 'react'
import ts from 'typescript'
import Keyword from '../text/Keyword'
import TypeNode from '../type/TypeNode'
import ExpressionRoot from './ExpressionRoot'

interface Props {
    node: ts.AsExpression
}

export default function AsExpression({ node }: Props): ReactElement {
    return (
        <span>
            <ExpressionRoot node={node.expression}></ExpressionRoot>{' '}
            <Keyword kind={node.kind}></Keyword>{' '}
            <TypeNode node={node.type}></TypeNode>
        </span>
    )
}

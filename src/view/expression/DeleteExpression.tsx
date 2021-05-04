import React, { ReactElement } from 'react'
import ts from 'typescript'
import Keyword from '../text/Keyword'
import ExpressionRoot from './ExpressionRoot'

interface Props {
    node: ts.DeleteExpression
}

export default function DeleteExpression({ node }: Props): ReactElement {
    return (
        <span>
            <Keyword kind={node.kind}></Keyword>{' '}
            <ExpressionRoot node={node.expression}></ExpressionRoot>
        </span>
    )
}

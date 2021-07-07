import React, { ReactElement } from 'react'
import ts from 'typescript'
import Keyword from '../text/Keyword'
import ExpressionRoot from './ExpressionRoot'

interface Props {
    editing: boolean
    node: ts.TypeOfExpression
}

export default function TypeOfExpression({
    editing,
    node,
}: Props): ReactElement {
    return (
        <span>
            <Keyword kind={node.kind} suffix=" "></Keyword>
            <ExpressionRoot
                node={node.expression}
                parent={node}
            ></ExpressionRoot>
        </span>
    )
}

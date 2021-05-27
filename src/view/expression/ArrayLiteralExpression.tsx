import React, { ReactElement } from 'react'
import ts from 'typescript'
import Expressionxx from './Expressionxx'

interface Props {
    editing: boolean
    node: ts.ArrayLiteralExpression
}

export default function ArrayLiteralExpression({
    editing,
    node,
}: Props): ReactElement {
    return (
        <span>
            [
            <Expressionxx editing={editing} list={node.elements}></Expressionxx>
            ]
        </span>
    )
}

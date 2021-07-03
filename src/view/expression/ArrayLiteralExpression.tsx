import React, { ReactElement } from 'react'
import ts from 'typescript'
import Expressionxx from './Expressionxx'

interface Props {
    editing: boolean
    node: ts.ArrayLiteralExpression
}

export default function ArrayLiteralExpression({ node }: Props): ReactElement {
    return (
        <span>
            [<Expressionxx list={node.elements}></Expressionxx>]
        </span>
    )
}

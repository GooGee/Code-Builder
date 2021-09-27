import React, { ReactElement } from 'react'
import ts from 'typescript'
import Expressionxx from './Expressionxx'

interface Props {
    node: ts.ArrayLiteralExpression
}

export default function ArrayLiteralExpression({ node }: Props): ReactElement {
    return (
        <Expressionxx
            list={node.elements}
            parent={node}
            root={node}
            prefix="["
            suffix="]"
        ></Expressionxx>
    )
}

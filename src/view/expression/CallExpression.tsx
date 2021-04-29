import React, { ReactElement } from 'react'
import ts from 'typescript'
import Expression from './Expression'
import Expressionxx from './Expressionxx'

interface Props {
    node: ts.CallExpression | ts.NewExpression
}

export default function CallExpression({ node }: Props): ReactElement {
    return (
        <span>
            <Expression node={node.expression}></Expression>
            {'('}
            <Expressionxx list={node.arguments!}></Expressionxx>
            {')'}
        </span>
    )
}

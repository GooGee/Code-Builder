import React, { ReactElement } from 'react'
import ts from 'typescript'
import Expression from './Expression'
import Expressionxx from './Expressionxx'

interface Props {
    editing: boolean
    node: ts.CallExpression | ts.NewExpression
}

export default function CallExpression({ editing, node }: Props): ReactElement {
    return (
        <span>
            <Expression editing={editing} node={node.expression}></Expression>
            {'('}
            <Expressionxx
                list={node.arguments!}
            ></Expressionxx>
            {')'}
        </span>
    )
}

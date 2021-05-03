import React, { ReactElement } from 'react'
import ts from 'typescript'
import ExpressionRoot from '../expression/ExpressionRoot'
import Identifier from '../expression/Identifier'

interface Props {
    node: ts.EnumMember
}

export default function EnumMember({ node }: Props): ReactElement {
    return (
        <div>
            <Identifier node={node.name as any}></Identifier>
            {node.initializer ? ' = ' : null}
            <ExpressionRoot node={node.initializer}></ExpressionRoot>
        </div>
    )
}

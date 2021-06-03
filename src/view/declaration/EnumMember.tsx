import React, { ReactElement } from 'react'
import ts from 'typescript'
import ExpressionRoot from '../expression/ExpressionRoot'
import Identifier from '../expression/Identifier'

interface Props {
    editing: boolean
    node: ts.EnumMember
}

export default function EnumMember({ editing, node }: Props): ReactElement {
    return (
        <span>
            <Identifier node={node.name as any}></Identifier>
            {node.initializer ? ' = ' : ''}
            <ExpressionRoot
                editing={editing}
                node={node.initializer}
                parent={node}
                propertyName="initializer"
            ></ExpressionRoot>
        </span>
    )
}

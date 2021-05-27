import React, { ReactElement } from 'react'
import ts from 'typescript'
import Identifier from '../expression/Identifier'
import TypeNode from '../type/TypeNode'

interface Props {
    editing: boolean
    node: ts.TypeParameterDeclaration
}

export default function TypeParameterDeclaration({
    editing,
    node,
}: Props): ReactElement {
    return (
        <span>
            <Identifier editing={editing} node={node.name}></Identifier>
            {node.constraint ? (
                <span className="keyword"> extends </span>
            ) : null}
            <TypeNode node={node.constraint}></TypeNode>
        </span>
    )
}

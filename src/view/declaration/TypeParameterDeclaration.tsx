import React, { ReactElement } from 'react'
import ts from 'typescript'
import Identifier from '../expression/Identifier'
import TypeNode from '../type/TypeNode'

interface Props {
    node: ts.TypeParameterDeclaration
}

export default function TypeParameterDeclaration({
    node,
}: Props): ReactElement {
    return (
        <span>
            <Identifier node={node.name}></Identifier>
            {node.constraint ? (
                <span className="keyword"> extends </span>
            ) : null}
            <TypeNode node={node.constraint}></TypeNode>
        </span>
    )
}

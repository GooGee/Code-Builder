import React, { ReactElement } from 'react'
import ts from 'typescript'
import Identifier from '../expression/Identifier'
import TypeRoot from '../type/TypeRoot'

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
            <TypeRoot
                editing={editing}
                node={node.constraint}
                parent={node}
                propertyName="constraint"
            ></TypeRoot>
        </span>
    )
}

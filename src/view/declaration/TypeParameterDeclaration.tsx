import React, { ReactElement } from 'react'
import ts from 'typescript'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
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
            <IdentifierDeclaration
                editing={editing}
                node={node.name}
            ></IdentifierDeclaration>
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

import React, { ReactElement } from 'react'
import ts from 'typescript'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
import TypeRoot from '../type/TypeRoot'

interface Props {
    node: ts.TypeParameterDeclaration
}

export default function TypeParameterDeclaration({
    node,
}: Props): ReactElement {
    return (
        <span>
            <IdentifierDeclaration node={node.name}></IdentifierDeclaration>
            <span className="keyword"> extends </span>
            <TypeRoot
                editing={true}
                node={node.constraint}
                parent={node}
            ></TypeRoot>
        </span>
    )
}

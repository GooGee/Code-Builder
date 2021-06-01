import React, { ReactElement } from 'react'
import ts from 'typescript'
import IdentifierDeclaration from './IdentifierDeclaration'

interface Props {
    editing: boolean
    node: ts.NamespaceImport
}

export default function NamespaceImport({
    editing,
    node,
}: Props): ReactElement {
    return (
        <span>
            {'*'}
            <span className="keyword">as</span>
            <IdentifierDeclaration
                editing={editing}
                node={node.name}
            ></IdentifierDeclaration>
        </span>
    )
}

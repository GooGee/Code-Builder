import React, { ReactElement } from 'react'
import ts from 'typescript'
import IdentifierDeclaration from './IdentifierDeclaration'

interface Props {
    editing: boolean
    node: ts.ImportSpecifier
}

export default function ImportSpecifier({
    editing,
    node,
}: Props): ReactElement {
    return (
        <IdentifierDeclaration
            editing={editing}
            node={node.name}
        ></IdentifierDeclaration>
    )
}

import React, { ReactElement } from 'react'
import ts from 'typescript'
import IdentifierDeclaration from './IdentifierDeclaration'

interface Props {
    node: ts.NamespaceImport
}

export default function NamespaceImport({ node }: Props): ReactElement {
    return (
        <span>
            {'*'}
            <span className="keyword">as</span>
            <IdentifierDeclaration node={node.name}></IdentifierDeclaration>
        </span>
    )
}

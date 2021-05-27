import React, { ReactElement } from 'react'
import ts from 'typescript'
import Identifier from './Identifier'

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
            <Identifier editing={editing} node={node.name}></Identifier>
        </span>
    )
}

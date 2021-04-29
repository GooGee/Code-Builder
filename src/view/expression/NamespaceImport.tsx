import React, { ReactElement } from 'react'
import ts from 'typescript'
import Identifier from './Identifier'

interface Props {
    node: ts.NamespaceImport
}

export default function NamespaceImport({ node }: Props): ReactElement {
    return (
        <span>
            {'*'}
            <span className="keyword">as</span>
            <Identifier node={node.name}></Identifier>
        </span>
    )
}

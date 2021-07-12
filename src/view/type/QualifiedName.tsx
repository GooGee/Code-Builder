import React, { ReactElement } from 'react'
import ts from 'typescript'
import EntityName from './EntityName'
import TypeIdentifier from './TypeIdentifier'

interface Props {
    node: ts.QualifiedName
}

export default function QualifiedName({ node }: Props): ReactElement {
    return (
        <span>
            <EntityName node={node.left}></EntityName>.
            <TypeIdentifier node={node.right}></TypeIdentifier>
        </span>
    )
}

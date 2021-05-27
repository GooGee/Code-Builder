import React, { ReactElement } from 'react'
import ts from 'typescript'
import EntityName from './EntityName'
import TypeArgumentxx from './TypeArgumentxx'

interface Props {
    editing?: boolean
    node: ts.TypeReferenceNode
}

export default function TypeReference({
    editing = false,
    node,
}: Props): ReactElement {
    return (
        <span>
            <EntityName editing={editing} node={node.typeName}></EntityName>
            <TypeArgumentxx list={node.typeArguments}></TypeArgumentxx>
        </span>
    )
}

import React, { ReactElement } from 'react'
import ts from 'typescript'
import EntityName from './EntityName'
import Identifier from './Identifier'

interface Props {
    editing: boolean
    node: ts.QualifiedName
}

export default function QualifiedName({ editing, node }: Props): ReactElement {
    return (
        <span>
            <EntityName editing={editing} node={node.left}></EntityName>
            <Identifier editing={editing} node={node.right}></Identifier>
        </span>
    )
}

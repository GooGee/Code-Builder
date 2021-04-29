import React, { ReactElement } from 'react'
import ts from 'typescript'
import EntityName from './EntityName'
import Identifier from './Identifier'

interface Props {
    node: ts.QualifiedName
}

export default function QualifiedName({ node }: Props): ReactElement {
    return (
        <span>
            <EntityName node={node.left}></EntityName>
            <Identifier node={node.right}></Identifier>
        </span>
    )
}

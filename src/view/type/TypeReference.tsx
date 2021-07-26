import React, { ReactElement } from 'react'
import ts from 'typescript'
import EntityName from './EntityName'
import TypeArgumentxx from './TypeArgumentxx'

interface Props {
    node: ts.TypeReferenceNode
}

export default function TypeReference({ node }: Props): ReactElement {
    return (
        <span>
            <EntityName node={node.typeName}></EntityName>
            <TypeArgumentxx
                list={node.typeArguments}
                parent={node}
            ></TypeArgumentxx>
        </span>
    )
}

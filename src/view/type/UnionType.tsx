import React, { ReactElement } from 'react'
import ts from 'typescript'
import TypeNodexx from './TypeNodexx'

interface Props {
    editing: boolean
    node: ts.UnionTypeNode
}

export default function UnionType({ editing, node }: Props): ReactElement {
    return (
        <TypeNodexx
            editing={editing}
            list={node.types}
            separator=" | "
        ></TypeNodexx>
    )
}

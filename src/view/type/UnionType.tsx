import React, { ReactElement } from 'react'
import ts from 'typescript'
import TypeArrayBox from './TypeArrayBox'

interface Props {
    node: ts.UnionTypeNode
}

export default function UnionType({ node }: Props): ReactElement {
    return (
        <TypeArrayBox
            list={node.types}
            parent={node}
            separator=" | "
        ></TypeArrayBox>
    )
}

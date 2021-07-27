import React, { ReactElement } from 'react'
import ts from 'typescript'
import TypeArrayView from './TypeArrayView'

interface Props {
    node: ts.UnionTypeNode
}

export default function UnionType({ node }: Props): ReactElement {
    return (
        <TypeArrayView
            list={node.types}
            parent={node}
            separator=" | "
        ></TypeArrayView>
    )
}

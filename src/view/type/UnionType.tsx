import React, { ReactElement } from 'react'
import ts from 'typescript'
import TypeNodexx from './TypeNodexx'

interface Props {
    node: ts.UnionTypeNode
}

export default function UnionType({ node }: Props): ReactElement {
    return <TypeNodexx list={node.types} separator=" | "></TypeNodexx>
}

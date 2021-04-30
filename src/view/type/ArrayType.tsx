import React, { ReactElement } from 'react'
import ts from 'typescript'
import TypeNode from './TypeNode'

interface Props {
    node: ts.ArrayTypeNode
}

export default function ArrayType({ node }: Props): ReactElement {
    return (
        <span>
            <span className="identifier">Array</span>
            &lt;
            <TypeNode node={node.elementType}></TypeNode>
            &gt;
        </span>
    )
}

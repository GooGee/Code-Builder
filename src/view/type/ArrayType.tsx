import React, { ReactElement } from 'react'
import ts from 'typescript'
import TypeRoot from './TypeRoot'

interface Props {
    node: ts.ArrayTypeNode
}

export default function ArrayType({ node }: Props): ReactElement {
    return (
        <span>
            <span className="identifier">Array</span>
            &lt;
            <TypeRoot node={node.elementType} parent={node}></TypeRoot>
            &gt;
        </span>
    )
}

import React, { ReactElement } from 'react'
import ts from 'typescript'
import TypeRoot from './TypeRoot'

interface Props {
    editing: boolean
    node: ts.ArrayTypeNode
}

export default function ArrayType({ editing, node }: Props): ReactElement {
    return (
        <span>
            <span className="identifier">Array</span>
            &lt;
            <TypeRoot
                editing={editing}
                node={node.elementType}
                parent={node}
                propertyName="elementType"
            ></TypeRoot>
            &gt;
        </span>
    )
}

import React, { ReactElement } from 'react'
import ts from 'typescript'
import TypeRoot from './TypeRoot'

interface Props {
    node: ts.ParenthesizedTypeNode
}

export default function ParenthesizedType({ node }: Props): ReactElement {
    return <TypeRoot node={node.type} parent={node} required={true}></TypeRoot>
}

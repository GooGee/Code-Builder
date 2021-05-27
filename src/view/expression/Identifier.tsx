import React, { ReactElement } from 'react'
import ts from 'typescript'

interface Props {
    editing: boolean
    node: ts.Identifier | ts.PrivateIdentifier
}

export default function Identifier({ editing, node }: Props): ReactElement {
    return <span className="identifier">{node.text}</span>
}

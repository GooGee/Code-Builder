import React, { ReactElement } from 'react'
import ts from 'typescript'

interface Props {
    node: ts.Identifier
}

export default function Identifier({ node }: Props): ReactElement {
    return <span className="identifier">{node.text}</span>
}

import React, { ReactElement } from 'react'
import ts from 'typescript'
import Diagnostic from '../control/Diagnostic'

interface Props {
    node: ts.Identifier
}

export default function Identifier({ node }: Props): ReactElement {
    return (
        <Diagnostic node={node}>
            <span className="identifier cursor-pointer">{node.text}</span>
        </Diagnostic>
    )
}

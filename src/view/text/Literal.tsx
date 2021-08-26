import React, { ReactElement } from 'react'
import ts from 'typescript'
import Diagnostic from '../control/Diagnostic'

interface Props {
    node: ts.NumericLiteral | ts.StringLiteral
}

export default function Literal({ node }: Props): ReactElement {
    const text = ts.isStringLiteral(node) ? `"${node.text}"` : node.text
    return (
        <Diagnostic node={node}>
            <span className="literal cursor-pointer">{text}</span>
        </Diagnostic>
    )
}

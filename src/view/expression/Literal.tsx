import React, { ReactElement } from 'react'
import ts from 'typescript'

interface Props {
    node: ts.NumericLiteral | ts.StringLiteral
}

export default function Literal({ node }: Props): ReactElement {
    const text = ts.isStringLiteral(node) ? `"${node.text}"` : node.text
    return <span className="literal">{text}</span>
}

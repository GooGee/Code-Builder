import React, { ReactElement } from 'react'
import ts from 'typescript'

interface Props {
    kind: ts.SyntaxKind
}

export default function Token({ kind }: Props): ReactElement {
    return <span className="token">{ts.tokenToString(kind)}</span>
}

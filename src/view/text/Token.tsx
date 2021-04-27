import React, { ReactElement } from 'react'
import ts from 'typescript'

interface Props {
    node: ts.Node
}

export default function Token({ node }: Props): ReactElement {
    return <span className="token item">{ts.tokenToString(node.kind)}</span>
}

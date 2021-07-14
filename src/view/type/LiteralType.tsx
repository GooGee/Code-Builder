import React, { ReactElement } from 'react'
import ts from 'typescript'
import Keyword from '../text/Keyword'
import Literal from '../text/Literal'

interface Props {
    node: ts.LiteralTypeNode
}

export default function LiteralType({ node }: Props): ReactElement {
    if (node.literal.kind === ts.SyntaxKind.NullKeyword) {
        return <Keyword kind={node.literal.kind}></Keyword>
    }

    return <Literal node={node.literal as any}></Literal>
}

import React, { ReactElement } from 'react'
import ts from 'typescript'
import Diagnostic from '../control/Diagnostic'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.Expression
}

export default function KeywordExpression({ node }: Props): ReactElement {
    // console.log(ts.SyntaxKind[node.kind])
    return (
        <Diagnostic node={node}>
            <Keyword kind={node.kind as any}></Keyword>
        </Diagnostic>
    )
}

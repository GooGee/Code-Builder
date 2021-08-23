import React, { ReactElement, useContext } from 'react'
import ts from 'typescript'
import SourceFileContext from '../context/SourceFileContext'
import ErrorTip from '../control/ErrorTip'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.Expression
}

export default function KeywordExpression({ node }: Props): ReactElement {
    const context = useContext(SourceFileContext)
    if (context.state?.worker.diagnosticMap.has(node.getStart())) {
        const diagnostic = context.state?.worker.diagnosticMap.get(
            node.getStart(),
        )
        return (
            <span>
                <Keyword kind={node.kind as any}></Keyword>
                <ErrorTip diagnostic={diagnostic!}></ErrorTip>
            </span>
        )
    }
    // console.log(ts.SyntaxKind[node.kind])
    return <Keyword kind={node.kind as any}></Keyword>
}

import React, { ReactElement, useContext } from 'react'
import ts from 'typescript'
import KeywordText from '../../helper/KeywordText'
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
        const text = ts.tokenToString(node.kind) ?? KeywordText(node.kind)
        if (text === undefined) {
            throw new Error(`Keyword not found: ${ts.SyntaxKind[node.kind]}`)
        }
        return <ErrorTip text={text} diagnostic={diagnostic!}></ErrorTip>
    }
    return <Keyword kind={node.kind as any}></Keyword>
}

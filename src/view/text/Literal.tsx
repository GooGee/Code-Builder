import React, { ReactElement, useContext } from 'react'
import ts from 'typescript'
import SourceFileContext from '../context/SourceFileContext'
import ErrorTip from '../control/ErrorTip'

interface Props {
    node: ts.NumericLiteral | ts.StringLiteral
}

export default function Literal({ node }: Props): ReactElement {
    const context = useContext(SourceFileContext)
    const text = ts.isStringLiteral(node) ? `"${node.text}"` : node.text
    if (context.state?.worker.diagnosticMap.has(node.getStart())) {
        const diagnostic = context.state?.worker.diagnosticMap.get(
            node.getStart(),
        )
        return <ErrorTip text={text} diagnostic={diagnostic!}></ErrorTip>
    }
    return <span className="literal cursor-pointer">{text}</span>
}

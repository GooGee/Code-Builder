import React, { ReactElement, useContext } from 'react'
import ts from 'typescript'
import SourceFileContext from '../context/SourceFileContext'
import ErrorTip from '../control/ErrorTip'

interface Props {
    node: ts.Identifier
}

export default function Identifier({ node }: Props): ReactElement {
    const context = useContext(SourceFileContext)
    if (context.state?.worker.diagnosticMap.has(node.getStart())) {
        const diagnostic = context.state?.worker.diagnosticMap.get(
            node.getStart(),
        )
        return (
            <span className="identifier cursor-pointer">
                {node.text}
                <ErrorTip diagnostic={diagnostic!}></ErrorTip>
            </span>
        )
    }
    return <span className="identifier cursor-pointer">{node.text}</span>
}

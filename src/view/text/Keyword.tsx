import React, { ReactElement } from 'react'
import ts from 'typescript'
import KeywordText from '../../helper/KeywordText'

interface Props {
    kind: ts.SyntaxKind
    prefix?: string
    suffix?: string
}

export default function Keyword({
    kind,
    prefix = '',
    suffix = '',
}: Props): ReactElement {
    const text = ts.tokenToString(kind) ?? KeywordText(kind)
    if (text === undefined) {
        throw new Error(`Keyword not found: ${ts.SyntaxKind[kind]}`)
    }
    return <span className="keyword">{prefix + text + suffix}</span>
}

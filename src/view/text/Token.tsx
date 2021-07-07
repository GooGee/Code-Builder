import React, { ReactElement } from 'react'
import ts from 'typescript'

interface Props {
    kind: ts.SyntaxKind
    prefix?: string
    suffix?: string
}

export default function Token({
    kind,
    prefix = '',
    suffix = '',
}: Props): ReactElement {
    return (
        <span className="token">
            {prefix + ts.tokenToString(kind) + suffix}
        </span>
    )
}

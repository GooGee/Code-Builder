import React, { ReactElement } from 'react'
import ts from 'typescript'

interface Props {
    flags: ts.NodeFlags
    prefix?: string
    suffix?: string
}

export default function VariableFlag({
    flags,
    prefix = '',
    suffix = '',
}: Props): ReactElement {
    const flag = flags & (ts.NodeFlags.Const | ts.NodeFlags.Let)
    return (
        <span className="keyword cursor-pointer">
            {prefix + ts.NodeFlags[flag].toLowerCase() + suffix}
        </span>
    )
}

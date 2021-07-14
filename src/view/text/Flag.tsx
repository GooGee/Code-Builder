import React, { ReactElement } from 'react'
import ts from 'typescript'

interface Props {
    node: ts.Node
    prefix?: string
    suffix?: string
}

export default function Flag({
    node,
    prefix = '',
    suffix = '',
}: Props): ReactElement {
    return (
        <span className="keyword">
            {prefix + ts.NodeFlags[node.flags & 3].toLowerCase() + suffix}
        </span>
    )
}

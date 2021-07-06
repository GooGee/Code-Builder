import React, { ReactElement } from 'react'
import ts from 'typescript'

interface Props {
    node: ts.Node
}

export default function Flag({ node }: Props): ReactElement {
    return (
        <span className="keyword">
            {ts.NodeFlags[node.flags & 3].toLowerCase() + ' '}
        </span>
    )
}

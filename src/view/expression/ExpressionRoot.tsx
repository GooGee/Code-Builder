import React, { ReactElement } from 'react'
import ts from 'typescript'
import Expression from './Expression'

interface Props {
    node: ts.Expression | undefined
}

export default function ExpressionRoot({ node }: Props): ReactElement | null {
    if (node === undefined) {
        return null
    }

    return (
        <span>
            <Expression node={node}></Expression>
        </span>
    )
}

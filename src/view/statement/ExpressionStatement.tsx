import React, { ReactElement } from 'react'
import ts from 'typescript'
import ExpressionRoot from '../expression/ExpressionRoot'

interface Props {
    node: ts.ExpressionStatement
}

export default function ExpressionStatement({ node }: Props): ReactElement {
    return (
        <div>
            <ExpressionRoot node={node.expression}></ExpressionRoot>
        </div>
    )
}

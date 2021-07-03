import React, { ReactElement } from 'react'
import ts from 'typescript'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.ThrowStatement
}

export default function ThrowStatement({ node }: Props): ReactElement {
    return (
        <span>
            <Keyword kind={node.kind}></Keyword>{' '}
            <ExpressionRoot
                node={node.expression}
                parent={node}
            ></ExpressionRoot>
        </span>
    )
}

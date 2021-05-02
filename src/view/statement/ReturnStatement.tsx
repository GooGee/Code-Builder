import React, { ReactElement } from 'react'
import ts from 'typescript'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.ReturnStatement
}

export default function ReturnStatement({ node }: Props): ReactElement {
    return (
        <div>
            <Keyword kind={node.kind}></Keyword>{' '}
            <ExpressionRoot node={node.expression}></ExpressionRoot>
        </div>
    )
}

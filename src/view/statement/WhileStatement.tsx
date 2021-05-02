import React, { ReactElement } from 'react'
import ts from 'typescript'
import Block from '../block/Block'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.WhileStatement
}

export default function WhileStatement({ node }: Props): ReactElement {
    return (
        <div>
            <Keyword kind={node.kind}></Keyword>{' '}
            <ExpressionRoot node={node.expression}></ExpressionRoot>
            <Block node={node.statement as any}></Block>
        </div>
    )
}

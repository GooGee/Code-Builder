import React, { ReactElement } from 'react'
import ts from 'typescript'
import Block from '../block/Block'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.DoStatement
}

export default function DoStatement({ node }: Props): ReactElement {
    const prefix = (
        <>
            <Keyword kind={node.kind}></Keyword>{' '}
        </>
    )
    const postfix = (
        <>
            <span className="keyword"> while </span>
            <ExpressionRoot node={node.expression}></ExpressionRoot>
        </>
    )
    return (
        <div>
            <Block
                node={node.statement as any}
                prefix={prefix}
                postfix={postfix}
            ></Block>
        </div>
    )
}

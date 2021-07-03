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
    const suffix = (
        <>
            <span className="keyword"> while </span>
            <ExpressionRoot
                node={node.expression}
                parent={node}
            ></ExpressionRoot>
        </>
    )
    return (
        <Block
            node={node.statement as any}
            prefix={prefix}
            suffix={suffix}
        ></Block>
    )
}

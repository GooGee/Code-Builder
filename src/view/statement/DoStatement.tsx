import React, { ReactElement } from 'react'
import ts from 'typescript'
import Block from '../block/Block'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    editing: boolean
    node: ts.DoStatement
}

export default function DoStatement({ editing, node }: Props): ReactElement {
    const prefix = (
        <>
            <Keyword kind={node.kind}></Keyword>{' '}
        </>
    )
    const postfix = (
        <>
            <span className="keyword"> while </span>
            <ExpressionRoot
                editing={editing}
                node={node.expression}
                parent={node}
            ></ExpressionRoot>
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

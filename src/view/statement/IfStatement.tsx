import React, { ReactElement } from 'react'
import ts from 'typescript'
import Block from '../block/Block'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    editing: boolean
    node: ts.IfStatement
}

export default function IfStatement({ editing, node }: Props): ReactElement {
    return (
        <span>
            <Keyword kind={node.kind}></Keyword>{' '}
            <ExpressionRoot
                editing={editing}
                node={node.expression}
                parent={node}
            ></ExpressionRoot>
            <Block node={node.thenStatement as any}></Block>
            <div className="keyword">else</div>
            <Block node={node.elseStatement as any}></Block>
        </span>
    )
}

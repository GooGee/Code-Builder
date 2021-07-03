import React, { ReactElement } from 'react'
import ts from 'typescript'
import Block from '../block/Block'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.IfStatement
}

export default function IfStatement({ node }: Props): ReactElement {
    return (
        <span>
            <Keyword kind={node.kind}></Keyword>{' '}
            <ExpressionRoot
                node={node.expression}
                parent={node}
            ></ExpressionRoot>
            <br />
            <Block node={node.thenStatement as any}></Block>
            <div className="keyword">else</div>
            <Block node={node.elseStatement as any}></Block>
        </span>
    )
}

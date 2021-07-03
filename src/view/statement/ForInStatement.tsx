import React, { ReactElement } from 'react'
import ts from 'typescript'
import Block from '../block/Block'
import VDLView from '../declaration/VDLView'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.ForInStatement
}

export default function ForInStatement({ node }: Props): ReactElement {
    return (
        <span>
            <span>
                <Keyword kind={node.kind}></Keyword>{' '}
                <VDLView node={node.initializer as any}></VDLView>
            </span>
            <div className="pl-11">
                <span className="keyword">in </span>
                <ExpressionRoot
                    node={node.expression}
                    parent={node}
                ></ExpressionRoot>
            </div>
            <Block node={node.statement as any}></Block>
        </span>
    )
}

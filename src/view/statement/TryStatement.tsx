import React, { ReactElement } from 'react'
import ts from 'typescript'
import Block from '../block/Block'
import CatchClause from '../block/CatchClause'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.TryStatement
}

export default function TryStatement({ node }: Props): ReactElement {
    return (
        <span>
            <Keyword kind={node.kind}></Keyword>
            <br />
            <Block node={node.tryBlock}></Block>
            <CatchClause node={node.catchClause!}></CatchClause>
            <div className="keyword">finally</div>
            <Block node={node.finallyBlock}></Block>
        </span>
    )
}

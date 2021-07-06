import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import Block from '../block/Block'
import CatchClause from '../block/CatchClause'
import MenuButton from '../control/MenuButton'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.TryStatement
}

export default function TryStatement({ node }: Props): ReactElement {
    return (
        <span>
            <MenuButton
                factory={StatementMenuFactory(node.parent as any, node)}
            >
                <Keyword kind={node.kind}></Keyword>
            </MenuButton>
            <br />
            <Block node={node.tryBlock}></Block>
            <CatchClause node={node.catchClause!}></CatchClause>
            <div className="keyword">finally</div>
            <Block node={node.finallyBlock}></Block>
        </span>
    )
}

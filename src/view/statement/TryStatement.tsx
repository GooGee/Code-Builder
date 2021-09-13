import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import Block from '../block/Block'
import CatchClause from '../block/CatchClause'
import EmptyBlock from '../block/EmptyBlock'
import StatementMenu from '../control/StatementMenu'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.TryStatement
}

export default function TryStatement({ node }: Props): ReactElement {
    return (
        <span>
            <StatementMenu
                factory={StatementMenuFactory}
                node={node}
                parent={node.parent as any}
            >
                <Keyword kind={node.kind} suffix=" "></Keyword>
            </StatementMenu>{' '}
            <Block node={node.tryBlock}></Block>
            <CatchClause node={node.catchClause!}></CatchClause>
            <EmptyBlock text=" finally " node={node.finallyBlock!}></EmptyBlock>
        </span>
    )
}

import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import StatementMenu from '../control/StatementMenu'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.BreakStatement | ts.ContinueStatement
}

export default function KeywordStatement({ node }: Props): ReactElement {
    return (
        <StatementMenu
            factory={StatementMenuFactory}
            node={node}
            parent={node.parent as any}
        >
            <Keyword kind={node.kind} suffix=" "></Keyword>
        </StatementMenu>
    )
}

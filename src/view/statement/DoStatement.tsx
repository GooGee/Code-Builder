import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import Block from '../block/Block'
import StatementMenu from '../control/StatementMenu'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.DoStatement
}

export default function DoStatement({ node }: Props): ReactElement {
    return (
        <span>
            <StatementMenu
                factory={StatementMenuFactory}
                node={node}
                parent={node.parent as any}
            >
                <Keyword kind={node.kind} suffix=" "></Keyword>
            </StatementMenu>
            <Block node={node.statement as any}></Block>
            <span className="keyword"> while </span>
            <ExpressionRoot
                node={node.expression}
                parent={node}
            ></ExpressionRoot>
        </span>
    )
}

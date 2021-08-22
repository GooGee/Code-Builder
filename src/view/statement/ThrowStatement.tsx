import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import StatementMenu from '../control/StatementMenu'
import NewExpression from '../expression/NewExpression'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.ThrowStatement
}

export default function ThrowStatement({ node }: Props): ReactElement {
    return (
        <span>
            <StatementMenu
                factory={StatementMenuFactory}
                node={node}
                parent={node.parent as any}
            >
                <Keyword kind={node.kind} suffix=" "></Keyword>
            </StatementMenu>
            <NewExpression node={node.expression as any}></NewExpression>
        </span>
    )
}

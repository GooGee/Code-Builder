import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import CaseBlock from '../block/CaseBlock'
import StatementMenu from '../control/StatementMenu'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.SwitchStatement
}

export default function SwitchStatement({ node }: Props): ReactElement {
    return (
        <span>
            <StatementMenu
                factory={StatementMenuFactory}
                node={node}
                parent={node.parent as any}
            >
                <Keyword kind={node.kind} suffix=" "></Keyword>
            </StatementMenu>
            <ExpressionRoot
                node={node.expression}
                parent={node}
            ></ExpressionRoot>{' '}
            <CaseBlock node={node.caseBlock}></CaseBlock>
        </span>
    )
}

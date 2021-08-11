import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import CaseBlock from '../block/CaseBlock'
import MenuModal from '../control/MenuModal'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.SwitchStatement
}

export default function SwitchStatement({ node }: Props): ReactElement {
    return (
        <span>
            <MenuModal
                factory={StatementMenuFactory(node.parent as any, node)}
            >
                <Keyword kind={node.kind} suffix=" "></Keyword>
            </MenuModal>
            <ExpressionRoot
                node={node.expression}
                parent={node}
            ></ExpressionRoot>{' '}
            <CaseBlock node={node.caseBlock}></CaseBlock>
        </span>
    )
}

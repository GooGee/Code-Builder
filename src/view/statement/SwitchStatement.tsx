import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import CaseBlock from '../block/CaseBlock'
import MenuButton from '../control/MenuButton'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.SwitchStatement
}

export default function SwitchStatement({ node }: Props): ReactElement {
    return (
        <span>
            <MenuButton
                factory={StatementMenuFactory(node.parent as any, node)}
            >
                <Keyword kind={node.kind}></Keyword>
            </MenuButton>
            <ExpressionRoot
                node={node.expression}
                parent={node}
            ></ExpressionRoot>
            <CaseBlock node={node.caseBlock}></CaseBlock>
        </span>
    )
}

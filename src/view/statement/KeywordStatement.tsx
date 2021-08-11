import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import MenuModal from '../control/MenuModal'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.BreakStatement | ts.ContinueStatement
}

export default function KeywordStatement({ node }: Props): ReactElement {
    return (
        <MenuModal factory={StatementMenuFactory(node.parent as any, node)}>
            <Keyword kind={node.kind} suffix=" "></Keyword>
        </MenuModal>
    )
}

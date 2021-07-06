import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import MenuButton from '../control/MenuButton'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.BreakStatement | ts.ContinueStatement
}

export default function KeywordStatement({ node }: Props): ReactElement {
    return (
        <MenuButton factory={StatementMenuFactory(node.parent as any, node)}>
            <Keyword kind={node.kind}></Keyword>
        </MenuButton>
    )
}

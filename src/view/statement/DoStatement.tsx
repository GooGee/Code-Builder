import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import Block from '../block/Block'
import MenuButton from '../control/MenuButton'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.DoStatement
}

export default function DoStatement({ node }: Props): ReactElement {
    return (
        <span>
            <MenuButton
                factory={StatementMenuFactory(node.parent as any, node)}
            >
                <Keyword kind={node.kind} suffix=" "></Keyword>
            </MenuButton>
            <Block node={node.statement as any}></Block>
            <span className="keyword"> while </span>
            <ExpressionRoot
                node={node.expression}
                parent={node}
            ></ExpressionRoot>
        </span>
    )
}

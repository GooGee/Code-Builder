import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import Block from '../block/Block'
import EmptyBlock from '../block/EmptyBlock'
import StatementMenu from '../control/StatementMenu'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.IfStatement
}

export default function IfStatement({ node }: Props): ReactElement {
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
            <Block node={node.thenStatement as any}></Block>
            <EmptyBlock
                text=" else "
                node={node.elseStatement as any}
            ></EmptyBlock>
        </span>
    )
}

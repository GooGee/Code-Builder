import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import MenuButton from '../control/MenuButton'
import NewExpression from '../expression/NewExpression'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.ThrowStatement
}

export default function ThrowStatement({ node }: Props): ReactElement {
    return (
        <span>
            <MenuButton
                factory={StatementMenuFactory(node.parent as any, node)}
            >
                <Keyword kind={node.kind} suffix=" "></Keyword>
            </MenuButton>
            <NewExpression node={node.expression as any}></NewExpression>
        </span>
    )
}

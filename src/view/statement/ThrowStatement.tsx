import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import MenuModal from '../control/MenuModal'
import NewExpression from '../expression/NewExpression'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.ThrowStatement
}

export default function ThrowStatement({ node }: Props): ReactElement {
    return (
        <span>
            <MenuModal
                factory={StatementMenuFactory(node.parent as any, node)}
            >
                <Keyword kind={node.kind} suffix=" "></Keyword>
            </MenuModal>
            <NewExpression node={node.expression as any}></NewExpression>
        </span>
    )
}

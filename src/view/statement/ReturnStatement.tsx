import React, { ReactElement } from 'react'
import ts from 'typescript'
import ExpressionMenuFactory from '../../helper/Menu/ExpressionMenuFactory'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import HoverButton from '../control/HoverButton'
import MenuModal from '../control/MenuModal'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.ReturnStatement
}

export default function ReturnStatement({ node }: Props): ReactElement {
    return (
        <span>
            <MenuModal
                factory={StatementMenuFactory(node.parent as any, node)}
            >
                <Keyword kind={node.kind} suffix=" "></Keyword>
            </MenuModal>
            {node.expression === undefined ? (
                <MenuModal
                    factory={ExpressionMenuFactory(node, node.expression)}
                >
                    <HoverButton>+</HoverButton>
                </MenuModal>
            ) : (
                <ExpressionRoot
                    node={node.expression}
                    parent={node}
                ></ExpressionRoot>
            )}
        </span>
    )
}

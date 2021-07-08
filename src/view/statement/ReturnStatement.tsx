import React, { ReactElement } from 'react'
import ts from 'typescript'
import ExpressionMenuFactory from '../../helper/Menu/ExpressionMenuFactory'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import MenuButton from '../control/MenuButton'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.ReturnStatement
}

export default function ReturnStatement({ node }: Props): ReactElement {
    return (
        <span>
            <MenuButton
                factory={StatementMenuFactory(node.parent as any, node)}
            >
                <Keyword kind={node.kind} suffix=" "></Keyword>
            </MenuButton>
            {node.expression === undefined ? (
                <MenuButton
                    factory={ExpressionMenuFactory(node, node.expression)}
                    visible={true}
                >
                    <span className="cursor-pointer px-2 py-1 mr-1">+</span>
                </MenuButton>
            ) : (
                <ExpressionRoot
                    node={node.expression}
                    parent={node}
                ></ExpressionRoot>
            )}
        </span>
    )
}

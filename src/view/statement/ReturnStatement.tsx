import React, { ReactElement } from 'react'
import ts from 'typescript'
import ExpressionMenuFactory from '../../helper/Menu/ExpressionMenuFactory'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import ExpressionMenu from '../control/ExpressionMenu'
import HoverButton from '../control/HoverButton'
import StatementMenu from '../control/StatementMenu'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.ReturnStatement
}

export default function ReturnStatement({ node }: Props): ReactElement {
    return (
        <span>
            <StatementMenu
                factory={StatementMenuFactory}
                node={node}
                parent={node.parent as any}
            >
                <Keyword kind={node.kind} suffix=" "></Keyword>
            </StatementMenu>
            {node.expression === undefined ? (
                <ExpressionMenu
                    factory={ExpressionMenuFactory}
                    node={node.expression}
                    parent={node}
                >
                    <HoverButton>+</HoverButton>
                </ExpressionMenu>
            ) : (
                <ExpressionRoot
                    node={node.expression}
                    parent={node}
                ></ExpressionRoot>
            )}
        </span>
    )
}

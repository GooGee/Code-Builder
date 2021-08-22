import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import StatementMenu from '../control/StatementMenu'
import Assign from '../expression/Assign'
import ExpressionRoot from '../expression/ExpressionRoot'

interface Props {
    node: ts.ExpressionStatement
}

export default function ExpressionStatement({ node }: Props): ReactElement {
    if (ts.isBinaryExpression(node.expression)) {
        return (
            <span>
                <StatementMenu
                    factory={StatementMenuFactory}
                    node={node}
                    parent={node.parent as any}
                >
                    <span className="keyword cursor-pointer">assign </span>
                </StatementMenu>
                <Assign node={node.expression}></Assign>
            </span>
        )
    }

    return (
        <span>
            <StatementMenu
                factory={StatementMenuFactory}
                node={node}
                parent={node.parent as any}
            >
                <span className="keyword cursor-pointer">call </span>
            </StatementMenu>
            <ExpressionRoot
                isLeft={true}
                node={node.expression}
                parent={node}
            ></ExpressionRoot>
        </span>
    )
}

import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import StatementMenu from '../control/StatementMenu'
import Assign from '../expression/Assign'
import ExpressionRoot from '../expression/ExpressionRoot'
import PointerText from '../text/PointerText'

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
                    <PointerText>assign </PointerText>
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
                <PointerText>call </PointerText>
            </StatementMenu>
            <ExpressionRoot
                isLeft={true}
                node={node.expression}
                parent={node}
            ></ExpressionRoot>
        </span>
    )
}

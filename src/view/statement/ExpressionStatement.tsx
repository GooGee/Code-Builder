import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import MenuButton from '../control/MenuButton'
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
                <MenuButton
                    factory={StatementMenuFactory(node.parent as any, node)}
                >
                    <PointerText>assign </PointerText>
                </MenuButton>
                <Assign node={node.expression}></Assign>
            </span>
        )
    }

    return (
        <span>
            <MenuButton
                factory={StatementMenuFactory(node.parent as any, node)}
            >
                <PointerText>call </PointerText>
            </MenuButton>
            <ExpressionRoot
                isLeft={true}
                node={node.expression}
                parent={node}
            ></ExpressionRoot>
        </span>
    )
}

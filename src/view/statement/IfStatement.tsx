import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import Block from '../block/Block'
import StatementMenu from '../control/StatementMenu'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.IfStatement
}

export default function IfStatement({ node }: Props): ReactElement {
    const block = node.elseStatement as ts.Block
    const [visible, setVisible] = useState(block.statements.length > 0)
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
            <span
                onClick={() => {
                    if (block.statements.length) {
                        return
                    }
                    setVisible(!visible)
                }}
                className="keyword cursor-pointer"
            >
                {' else '}
            </span>
            {visible === false ? (
                '{}'
            ) : (
                <Block node={node.elseStatement as any}></Block>
            )}
        </span>
    )
}

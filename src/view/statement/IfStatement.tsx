import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import Block from '../block/Block'
import MenuButton from '../control/MenuButton'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'
import PointerText from '../text/PointerText'

interface Props {
    node: ts.IfStatement
}

export default function IfStatement({ node }: Props): ReactElement {
    const block = node.elseStatement as ts.Block
    const [visible, setVisible] = useState(block.statements.length > 0)
    return (
        <span>
            <MenuButton
                factory={StatementMenuFactory(node.parent as any, node)}
            >
                <Keyword kind={node.kind} suffix=" "></Keyword>
            </MenuButton>
            <ExpressionRoot
                node={node.expression}
                parent={node}
            ></ExpressionRoot>
            <br />
            <Block node={node.thenStatement as any}></Block>
            <PointerText
                onClick={() => {
                    if (block.statements.length) {
                        return
                    }
                    setVisible(!visible)
                }}
            >
                {' else '}
            </PointerText>
            {visible === false ? (
                '{}'
            ) : (
                <Block node={node.elseStatement as any}></Block>
            )}
        </span>
    )
}

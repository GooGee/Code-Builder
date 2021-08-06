import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import Block from '../block/Block'
import CatchClause from '../block/CatchClause'
import MenuButton from '../control/MenuButton'
import Keyword from '../text/Keyword'
import PointerText from '../text/PointerText'

interface Props {
    node: ts.TryStatement
}

export default function TryStatement({ node }: Props): ReactElement {
    const [visible, setVisible] = useState(
        node.finallyBlock!.statements.length > 0,
    )
    return (
        <span>
            <MenuButton
                factory={StatementMenuFactory(node.parent as any, node)}
            >
                <Keyword kind={node.kind} suffix=" "></Keyword>
            </MenuButton>{' '}
            <Block node={node.tryBlock}></Block>
            <CatchClause node={node.catchClause!}></CatchClause>
            <PointerText
                onClick={() => {
                    if (node.finallyBlock!.statements.length) {
                        return
                    }
                    setVisible(!visible)
                }}
            >
                {' finally '}
            </PointerText>
            {visible === false ? (
                '{}'
            ) : (
                <Block node={node.finallyBlock}></Block>
            )}
        </span>
    )
}

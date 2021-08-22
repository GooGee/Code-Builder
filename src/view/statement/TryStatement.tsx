import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import Block from '../block/Block'
import CatchClause from '../block/CatchClause'
import StatementMenu from '../control/StatementMenu'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.TryStatement
}

export default function TryStatement({ node }: Props): ReactElement {
    const [visible, setVisible] = useState(
        node.finallyBlock!.statements.length > 0,
    )
    return (
        <span>
            <StatementMenu
                factory={StatementMenuFactory}
                node={node}
                parent={node.parent as any}
            >
                <Keyword kind={node.kind} suffix=" "></Keyword>
            </StatementMenu>{' '}
            <Block node={node.tryBlock}></Block>
            <CatchClause node={node.catchClause!}></CatchClause>
            <span
                onClick={() => {
                    if (node.finallyBlock!.statements.length) {
                        return
                    }
                    setVisible(!visible)
                }}
                className="keyword cursor-pointer"
            >
                {' finally '}
            </span>
            {visible === false ? (
                '{}'
            ) : (
                <Block node={node.finallyBlock}></Block>
            )}
        </span>
    )
}

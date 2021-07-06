import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import Block from '../block/Block'
import MenuButton from '../control/MenuButton'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.DoStatement
}

export default function DoStatement({ node }: Props): ReactElement {
    const prefix = (
        <MenuButton factory={StatementMenuFactory(node.parent as any, node)}>
            <Keyword kind={node.kind}></Keyword>
        </MenuButton>
    )
    const suffix = (
        <>
            <span className="keyword"> while </span>
            <ExpressionRoot
                node={node.expression}
                parent={node}
            ></ExpressionRoot>
        </>
    )
    return (
        <Block
            node={node.statement as any}
            prefix={prefix}
            suffix={suffix}
        ></Block>
    )
}

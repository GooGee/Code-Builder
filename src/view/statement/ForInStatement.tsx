import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import Block from '../block/Block'
import MenuButton from '../control/MenuButton'
import VDLView from '../declaration/VDLView'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.ForInStatement
}

export default function ForInStatement({ node }: Props): ReactElement {
    return (
        <span>
            <span>
                <MenuButton
                    factory={StatementMenuFactory(node.parent as any, node)}
                >
                    <Keyword kind={node.kind}></Keyword>
                </MenuButton>
                <VDLView node={node.initializer as any}></VDLView>
            </span>
            <div className="pl-11">
                <span className="keyword">in </span>
                <ExpressionRoot
                    isLeft={true}
                    node={node.expression}
                    parent={node}
                ></ExpressionRoot>
            </div>
            <Block node={node.statement as any}></Block>
        </span>
    )
}

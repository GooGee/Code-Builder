import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import Block from '../block/Block'
import MenuButton from '../control/MenuButton'
import VDLView from '../declaration/VDLView'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.ForOfStatement
}

export default function ForOfStatement({ node }: Props): ReactElement {
    return (
        <span>
            <span>
                <MenuButton
                    factory={StatementMenuFactory(node.parent as any, node)}
                >
                    <Keyword kind={node.kind} suffix=" "></Keyword>
                </MenuButton>
                <VDLView node={node.initializer as any}></VDLView>
            </span>
            <div className="pl-11">
                <span className="keyword">of </span>
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

import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import Block from '../block/Block'
import MenuButton from '../control/MenuButton'
import VDLView from '../declaration/VDLView'
import Assign from '../expression/Assign'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.ForStatement
}

export default function ForStatement({ node }: Props): ReactElement {
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
                <div>
                    <ExpressionRoot
                        node={node.condition}
                        parent={node}
                        propertyName="condition"
                    ></ExpressionRoot>
                </div>
                <div>
                    <Assign node={node.incrementor as any}></Assign>
                </div>
            </div>
            <Block node={node.statement as any}></Block>
        </span>
    )
}

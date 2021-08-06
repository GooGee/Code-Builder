import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import Block from '../block/Block'
import MenuButton from '../control/MenuButton'
import VariableDeclarationList from '../declaration/VariableDeclarationList'
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
                    <Keyword kind={node.kind} suffix=" "></Keyword>
                </MenuButton>
                <VariableDeclarationList
                    node={node.initializer as any}
                ></VariableDeclarationList>
            </span>
            <br />
            <span className="pl-11">
                <span className="keyword">in </span>
                <ExpressionRoot
                    isLeft={true}
                    node={node.expression}
                    parent={node}
                ></ExpressionRoot>{' '}
            </span>
            <Block node={node.statement as any}></Block>
        </span>
    )
}

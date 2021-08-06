import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import Block from '../block/Block'
import MenuButton from '../control/MenuButton'
import VariableDeclarationList from '../declaration/VariableDeclarationList'
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
                    <Keyword kind={node.kind} suffix=" "></Keyword>
                </MenuButton>
                <VariableDeclarationList
                    node={node.initializer as any}
                ></VariableDeclarationList>
            </span>
            <br />
            <span className="pl-11">
                <ExpressionRoot
                    node={node.condition}
                    parent={node}
                    propertyName="condition"
                ></ExpressionRoot>
            </span>
            <br />
            <span className="pl-11">
                <Assign node={node.incrementor as any}></Assign>
            </span>{' '}
            <Block node={node.statement as any}></Block>
        </span>
    )
}

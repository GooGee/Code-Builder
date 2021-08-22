import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import Block from '../block/Block'
import StatementMenu from '../control/StatementMenu'
import VariableDeclarationList from '../declaration/VariableDeclarationList'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.ForOfStatement
}

export default function ForOfStatement({ node }: Props): ReactElement {
    return (
        <span>
            <span>
            <StatementMenu
                factory={StatementMenuFactory}
                node={node}
                parent={node.parent as any}
            >
                <Keyword kind={node.kind} suffix=" "></Keyword>
            </StatementMenu>
                <VariableDeclarationList
                    node={node.initializer as any}
                ></VariableDeclarationList>
            </span>
            <br />
            <span className="pl-11">
                <span className="keyword">of </span>
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

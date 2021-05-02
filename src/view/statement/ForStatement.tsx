import React, { ReactElement } from 'react'
import ts from 'typescript'
import Block from '../block/Block'
import VariableDeclarationList from '../declaration/VariableDeclarationList'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.ForStatement
}

export default function ForStatement({ node }: Props): ReactElement {
    return (
        <div>
            <span>
                <Keyword kind={node.kind}></Keyword>{' '}
                <VariableDeclarationList
                    node={node.initializer as any}
                ></VariableDeclarationList>
            </span>
            <div className="block-padding">
                <div>
                    <ExpressionRoot node={node.condition}></ExpressionRoot>
                </div>
                <div>
                    <ExpressionRoot node={node.incrementor}></ExpressionRoot>
                </div>
            </div>
            <Block node={node.statement as any}></Block>
        </div>
    )
}

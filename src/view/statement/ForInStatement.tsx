import React, { ReactElement } from 'react'
import ts from 'typescript'
import Block from '../block/Block'
import VariableDeclarationList from '../declaration/VariableDeclarationList'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.ForInStatement
}

export default function ForInStatement({ node }: Props): ReactElement {
    return (
        <div>
            <div>
                <Keyword kind={node.kind}></Keyword>{' '}
                <VariableDeclarationList
                    node={node.initializer as any}
                ></VariableDeclarationList>
            </div>
            <div className="pl-9">
                <span className="keyword">in </span>
                <ExpressionRoot node={node.expression}></ExpressionRoot>
            </div>
            <Block node={node.statement as any}></Block>
        </div>
    )
}

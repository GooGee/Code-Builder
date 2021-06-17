import React, { ReactElement } from 'react'
import ts from 'typescript'
import Block from '../block/Block'
import VariableDeclarationList from '../declaration/VariableDeclarationList'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    editing: boolean
    node: ts.ForOfStatement
}

export default function ForOfStatement({ editing, node }: Props): ReactElement {
    return (
        <span>
            <span>
                <Keyword kind={node.kind}></Keyword>{' '}
                <VariableDeclarationList
                    editing={editing}
                    node={node.initializer as any}
                ></VariableDeclarationList>
            </span>
            <div className="pl-11">
                <span className="keyword">of </span>
                <ExpressionRoot
                    editing={editing}
                    node={node.expression}
                    parent={node}
                ></ExpressionRoot>
            </div>
            <Block node={node.statement as any}></Block>
        </span>
    )
}

import React, { ReactElement } from 'react'
import ts from 'typescript'
import Block from '../block/Block'
import VariableDeclarationList from '../declaration/VariableDeclarationList'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    editing: boolean
    node: ts.ForStatement
}

export default function ForStatement({ editing, node }: Props): ReactElement {
    return (
        <div>
            <span>
                <Keyword kind={node.kind}></Keyword>{' '}
                <VariableDeclarationList
                    editing={editing}
                    node={node.initializer as any}
                ></VariableDeclarationList>
            </span>
            <div className="pl-9">
                <div>
                    <ExpressionRoot
                        editing={editing}
                        node={node.condition}
                        parent={node}
                        propertyName="condition"
                    ></ExpressionRoot>
                </div>
                <div>
                    <ExpressionRoot
                        editing={editing}
                        node={node.incrementor}
                        parent={node}
                        propertyName="incrementor"
                    ></ExpressionRoot>
                </div>
            </div>
            <Block node={node.statement as any}></Block>
        </div>
    )
}

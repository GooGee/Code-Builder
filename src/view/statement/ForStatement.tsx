import React, { ReactElement } from 'react'
import ts from 'typescript'
import Block from '../block/Block'
import VDLView from '../declaration/VDLView'
import Assign from '../expression/Assign'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    editing: boolean
    node: ts.ForStatement
}

export default function ForStatement({ editing, node }: Props): ReactElement {
    return (
        <span>
            <span>
                <Keyword kind={node.kind}></Keyword>{' '}
                <VDLView node={node.initializer as any}></VDLView>
            </span>
            <div className="pl-11">
                <div>
                    <ExpressionRoot
                        editing={editing}
                        node={node.condition}
                        parent={node}
                        propertyName="condition"
                    ></ExpressionRoot>
                </div>
                <div>
                    <Assign
                        editing={editing}
                        node={node.incrementor as any}
                    ></Assign>
                </div>
            </div>
            <Block node={node.statement as any}></Block>
        </span>
    )
}

import React, { ReactElement } from 'react'
import ts from 'typescript'
import ExpressionRoot from '../expression/ExpressionRoot'
import Statementxx from '../statement/Statementxx'
import Keyword from '../text/Keyword'

interface Props {
    editing: boolean
    node: ts.CaseClause
}

export default function CaseClause({ editing, node }: Props): ReactElement {
    return (
        <span>
            <Keyword kind={node.kind}></Keyword>{' '}
            <ExpressionRoot
                editing={editing}
                node={node.expression}
                parent={node}
            ></ExpressionRoot>
            <div className="pl-9">
                <Statementxx list={node.statements}></Statementxx>
            </div>
        </span>
    )
}

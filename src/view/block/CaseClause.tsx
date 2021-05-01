import React, { ReactElement } from 'react'
import ts from 'typescript'
import ExpressionRoot from '../expression/ExpressionRoot'
import Statementxx from '../statement/Statementxx'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.CaseClause
}

export default function CaseClause({ node }: Props): ReactElement {
    return (
        <div>
            <Keyword kind={node.kind}></Keyword>{' '}
            <ExpressionRoot node={node.expression}></ExpressionRoot>
            <div className="block-padding">
                <Statementxx list={node.statements}></Statementxx>
            </div>
        </div>
    )
}

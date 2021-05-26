import React, { ReactElement } from 'react'
import ts from 'typescript'
import CaseMenuFactory from '../../helper/Menu/CaseMenuFactory'
import StatementLine from '../control/StatementLine'
import ExpressionRoot from '../expression/ExpressionRoot'
import Statementxx from '../statement/Statementxx'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.CaseClause
}

export default function CaseClause({ node }: Props): ReactElement {
    function vf(editing: boolean) {
        return (
            <span>
                <Keyword kind={node.kind}></Keyword>{' '}
                <ExpressionRoot
                    editing={editing}
                    node={node.expression}
                    parent={node}
                ></ExpressionRoot>
            </span>
        )
    }
    return (
        <div>
            <StatementLine
                menuFactory={CaseMenuFactory(node.parent, node)}
                viewFactory={vf}
            ></StatementLine>

            <div className="pl-9">
                <Statementxx list={node.statements}></Statementxx>
            </div>
        </div>
    )
}

import React, { ReactElement } from 'react'
import ts from 'typescript'
import Statementxx from '../statement/Statementxx'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.DefaultClause
}

export default function DefaultClause({ node }: Props): ReactElement {
    return (
        <span>
            <Keyword kind={node.kind}></Keyword>
            <div className="pl-11">
                <Statementxx list={node.statements}></Statementxx>
            </div>
        </span>
    )
}

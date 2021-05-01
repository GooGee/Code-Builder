import React, { ReactElement } from 'react'
import ts from 'typescript'
import Statementxx from '../statement/Statementxx'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.DefaultClause
}

export default function DefaultClause({ node }: Props): ReactElement {
    return (
        <div>
            <Keyword kind={node.kind}></Keyword>
            <div className="block-padding">
                <Statementxx list={node.statements}></Statementxx>
            </div>
        </div>
    )
}

import React, { ReactElement } from 'react'
import ts from 'typescript'
import UniqueKey from '../../helper/UniqueKey'
import CaseClause from './CaseClause'
import DefaultClause from './DefaultClause'

interface Props {
    node: ts.CaseBlock
}

export default function CaseBlock({ node }: Props): ReactElement {
    const uk = UniqueKey()
    return (
        <span>
            {'{'}
            <div className="pl-11">
                {node.clauses.map((clause) => {
                    if (ts.isCaseClause(clause)) {
                        return (
                            <CaseClause key={uk()} node={clause}></CaseClause>
                        )
                    }
                    return (
                        <DefaultClause key={uk()} node={clause}></DefaultClause>
                    )
                })}
            </div>
            {'}'}
        </span>
    )
}

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
        <div>
            {'{'}
            <div className="block-padding">
                {node.clauses.map((clause) => {
                    if (ts.isCaseClause(clause)) {
                        return (
                            <CaseClause node={clause} key={uk()}></CaseClause>
                        )
                    }
                    return (
                        <DefaultClause node={clause} key={uk()}></DefaultClause>
                    )
                })}
            </div>
            {'}'}
        </div>
    )
}

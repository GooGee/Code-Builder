import React, { ReactElement } from 'react'
import ts from 'typescript'
import CaseMenuFactory from '../../helper/Menu/CaseMenuFactory'
import UniqueKey from '../../helper/UniqueKey'
import StatementLine from '../control/StatementLine'
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
            <div onClick={(event) => event.stopPropagation()} className="pl-9">
                {node.clauses.map((clause) => {
                    if (ts.isCaseClause(clause)) {
                        return (
                            <StatementLine
                                key={uk()}
                                menuFactory={CaseMenuFactory(node, clause)}
                                viewFactory={() => (
                                    <CaseClause node={clause}></CaseClause>
                                )}
                            ></StatementLine>
                        )
                    }
                    return (
                        <StatementLine
                            key={uk()}
                            menuFactory={CaseMenuFactory(node, clause as any)}
                            viewFactory={() => (
                                <DefaultClause node={clause}></DefaultClause>
                            )}
                        ></StatementLine>
                    )
                })}
            </div>
            {'}'}
        </div>
    )
}

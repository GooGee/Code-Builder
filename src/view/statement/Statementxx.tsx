import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import UniqueKey from '../../helper/UniqueKey'
import StatementLine from '../control/StatementLine'
import Statement from './Statement'

interface Props {
    list: ts.NodeArray<ts.Statement>
}

export default function Statementxx({ list }: Props): ReactElement {
    const uk = UniqueKey()
    return (
        <div>
            {list.map((item) => {
                return (
                    <StatementLine
                        menuFactory={StatementMenuFactory(
                            item.parent as any,
                            item,
                        )}
                        viewFactory={(editing) => (
                            <Statement
                                editing={editing}
                                node={item}
                            ></Statement>
                        )}
                        key={uk()}
                    ></StatementLine>
                )
            })}
        </div>
    )
}

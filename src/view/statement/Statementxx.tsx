import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import UniqueKey from '../../helper/UniqueKey'
import StatementLine from '../control/StatementLine'
import ClassDeclaration from '../declaration/ClassDeclaration'
import EnumDeclaration from '../declaration/EnumDeclaration'
import InterfaceDeclaration from '../declaration/InterfaceDeclaration'
import Statement from './Statement'

interface Props {
    list: ts.NodeArray<ts.Statement>
}

export default function Statementxx({ list }: Props): ReactElement {
    const uk = UniqueKey()
    return (
        <div>
            {list.map((item) => {
                if (ts.isClassDeclaration(item)) {
                    return (
                        <ClassDeclaration
                            key={uk()}
                            node={item}
                        ></ClassDeclaration>
                    )
                }
                if (ts.isEnumDeclaration(item)) {
                    return (
                        <EnumDeclaration
                            key={uk()}
                            node={item}
                        ></EnumDeclaration>
                    )
                }
                if (ts.isInterfaceDeclaration(item)) {
                    return (
                        <InterfaceDeclaration
                            key={uk()}
                            node={item}
                        ></InterfaceDeclaration>
                    )
                }

                return (
                    <StatementLine
                        key={uk()}
                        menuFactory={StatementMenuFactory(
                            item.parent as any,
                            item,
                        )}
                        viewFactory={(editing) => (
                            <Statement node={item}></Statement>
                        )}
                    ></StatementLine>
                )
            })}
        </div>
    )
}

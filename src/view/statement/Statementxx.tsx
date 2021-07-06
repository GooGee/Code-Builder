import React, { ReactElement } from 'react'
import ts from 'typescript'
import UniqueKey from '../../helper/UniqueKey'
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
                    <div key={uk()}>
                        <Statement node={item}></Statement>
                    </div>
                )
            })}
        </div>
    )
}

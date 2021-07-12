import React, { ReactElement } from 'react'
import ts from 'typescript'
import UniqueKey from '../../helper/UniqueKey'
import VariableDeclaration from './VariableDeclaration'

interface Props {
    list: ts.NodeArray<ts.VariableDeclaration>
}

export default function VariableDeclarationxx({
    list,
}: Props): ReactElement {
    const uk = UniqueKey()
    return (
        <span>
            {list.map((item) => {
                return (
                    <VariableDeclaration
                        node={item}
                        key={uk()}
                    ></VariableDeclaration>
                )
            })}
        </span>
    )
}

import React, { ReactElement } from 'react'
import ts from 'typescript'
import VariableDeclaration from './VariableDeclaration'

interface Props {
    list: ts.NodeArray<ts.VariableDeclaration>
}

export default function VariableDeclarationxx({ list }: Props): ReactElement {
    return (
        <span>
            {list.map((item) => {
                return (
                    <VariableDeclaration
                        node={item}
                        key={item.name.getText()}
                    ></VariableDeclaration>
                )
            })}
        </span>
    )
}

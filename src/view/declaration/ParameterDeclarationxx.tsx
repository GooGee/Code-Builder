import React, { ReactElement } from 'react'
import ts from 'typescript'
import UniqueKey from '../../helper/UniqueKey'
import ParameterDeclaration from './ParameterDeclaration'

interface Props {
    editing: boolean
    list: ts.NodeArray<ts.ParameterDeclaration>
}

export default function ParameterDeclarationxx({
    editing,
    list,
}: Props): ReactElement {
    const uk = UniqueKey()
    return (
        <span>
            (
            {list.length === 0
                ? null
                : list.map((item) => (
                      <ParameterDeclaration
                          key={uk()}
                          node={item}
                      ></ParameterDeclaration>
                  ))}
            )
        </span>
    )
}

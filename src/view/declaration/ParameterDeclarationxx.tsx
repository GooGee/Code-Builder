import React, { ReactElement } from 'react'
import ts from 'typescript'
import UniqueKey from '../../helper/UniqueKey'
import ParameterDeclaration from './ParameterDeclaration'

interface Props {
    list: ts.NodeArray<ts.ParameterDeclaration>
    parent: ts.SignatureDeclarationBase
}

export default function ParameterDeclarationxx({
    list,
    parent,
}: Props): ReactElement | null {
    if (list.length === 0) {
        return null
    }
    const uk = UniqueKey()
    return (
        <span>
            (
            {list
                .map((item) => (
                    <span key={uk()}>
                        <ParameterDeclaration
                            node={item}
                        ></ParameterDeclaration>
                    </span>
                ))
                .reduce((previousValue, currentValue): any => {
                    return [previousValue, ', ', currentValue]
                })}
            )
        </span>
    )
}

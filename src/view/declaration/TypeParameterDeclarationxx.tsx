import React, { ReactElement } from 'react'
import ts from 'typescript'
import UniqueKey from '../../helper/UniqueKey'
import TypeParameterDeclaration from './TypeParameterDeclaration'

interface Props {
    list: ts.NodeArray<ts.TypeParameterDeclaration> | undefined
}

export default function TypeParameterDeclarationxx({
    list,
}: Props): ReactElement | null {
    if (list === undefined) {
        return null
    }
    if (list.length === 0) {
        return null
    }

    const uk = UniqueKey()
    return (
        <span>
            &lt;
            {list
                .map((item) => (
                    <TypeParameterDeclaration
                        node={item}
                        key={uk()}
                    ></TypeParameterDeclaration>
                ))
                .reduce((previousValue, currentValue): any => {
                    return [previousValue, ', ', currentValue]
                })}
            &gt;
        </span>
    )
}

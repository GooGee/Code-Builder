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

    const editing = false
    const uk = UniqueKey()
    function getxx(lll: ts.NodeArray<ts.TypeParameterDeclaration>) {
        if (lll.length === 0) {
            return null
        }
        return lll
            .map((item) => {
                return (
                    <TypeParameterDeclaration
                        editing={editing}
                        node={item}
                        key={uk()}
                    ></TypeParameterDeclaration>
                )
            })
            .reduce((previousValue, currentValue): any => {
                return [previousValue, ', ', currentValue]
            })
    }
    return <span>&lt;{getxx(list)}&gt;</span>
}

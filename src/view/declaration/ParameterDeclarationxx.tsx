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
    function getxx() {
        if (list.length === 0) {
            return null
        }
        return list.map((item) => {
            return (
                <ParameterDeclaration
                    node={item}
                    key={uk()}
                ></ParameterDeclaration>
            )
        })
    }

    return <span>({getxx()})</span>
}

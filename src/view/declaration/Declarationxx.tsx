import React, { ReactElement } from 'react'
import ts from 'typescript'
import UniqueKey from '../../helper/UniqueKey'
import Declaration from './Declaration'

interface Props {
    list: ts.NodeArray<ts.Statement>
}

export default function Declarationxx({ list }: Props): ReactElement {
    const uk = UniqueKey()
    return (
        <div className="pl-9">
            {list.map((item) => {
                return <Declaration node={item as any} key={uk()}></Declaration>
            })}
        </div>
    )
}

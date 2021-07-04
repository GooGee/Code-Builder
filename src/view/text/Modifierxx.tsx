import React, { ReactElement } from 'react'
import ts from 'typescript'
import UniqueKey from '../../helper/UniqueKey'
import Keyword from './Keyword'

interface Props {
    list: ts.NodeArray<ts.Modifier> | undefined
}

export default function Modifierxx({ list }: Props): ReactElement {
    if (list === undefined) {
        return <span className="keyword">define </span>
    }

    const uk = UniqueKey()
    return (
        <span>
            {list.map((item) => {
                return <Keyword kind={item.kind} key={uk()}></Keyword>
            })}
        </span>
    )
}

import React, { ReactElement } from 'react'
import ts from 'typescript'
import UniqueKey from '../../helper/UniqueKey'
import TypeRoot from './TypeRoot'

interface Props {
    editing: boolean
    list: ts.NodeArray<ts.TypeNode>
    separator: string
}

export default function TypeNodexx({
    editing,
    list,
    separator,
}: Props): ReactElement | null {
    if (list.length === 0) {
        return null
    }

    const uk = UniqueKey()
    return (
        <span>
            {list
                .map((item) => {
                    return (
                        <TypeRoot
                            editing={editing}
                            node={item}
                            parent={item.parent}
                            key={uk()}
                        ></TypeRoot>
                    )
                })
                .reduce((previousValue, currentValue): any => {
                    return [previousValue, separator, currentValue]
                })}
        </span>
    )
}

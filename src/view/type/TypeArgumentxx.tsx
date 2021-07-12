import React, { ReactElement } from 'react'
import ts from 'typescript'
import TypeNodexx from './TypeNodexx'

interface Props {
    list: ts.NodeArray<ts.TypeNode> | undefined
}

export default function TypeArgumentxx({ list }: Props): ReactElement | null {
    if (list === undefined) {
        return null
    }

    const editing = false
    return (
        <span>
            &lt;
            <TypeNodexx
                editing={editing}
                list={list}
                separator=", "
            ></TypeNodexx>
            &gt;
        </span>
    )
}

import React, { ReactElement } from 'react'
import ts from 'typescript'
import TypeNodexx from './TypeNodexx'

interface Props {
    editing: boolean
    list: ts.NodeArray<ts.TypeNode> | undefined
}

export default function TypeArgumentxx({
    editing,
    list,
}: Props): ReactElement | null {
    if (list === undefined) {
        return null
    }

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

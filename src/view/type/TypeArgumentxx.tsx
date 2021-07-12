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

    return (
        <span>
            &lt;
            <TypeNodexx list={list} separator=", "></TypeNodexx>
            &gt;
        </span>
    )
}

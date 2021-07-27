import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import Button from '../control/Button'
import TypeArgumentTable from './TypeArgumentTable'
import TypeNodexx from './TypeNodexx'

interface Props {
    list: ts.NodeArray<ts.TypeNode> | undefined
    parent: ts.ExpressionWithTypeArguments | ts.TypeReferenceNode
}

export default function TypeArgumentxx({
    list,
    parent,
}: Props): ReactElement | null {
    const [editing, setEditing] = useState(false)
    if (list === undefined) {
        return null
    }

    if (editing) {
        return (
            <TypeArgumentTable list={list}>
                <Button onClick={() => setEditing(false)} color="red">
                    x
                </Button>
            </TypeArgumentTable>
        )
    }

    if (list.length === 0) {
        return null
    }

    return (
        <span
            onClick={(event) => {
                event.stopPropagation()
                setEditing(true)
            }}
        >
            &lt;
            <TypeNodexx list={list}></TypeNodexx>
            &gt;
        </span>
    )
}

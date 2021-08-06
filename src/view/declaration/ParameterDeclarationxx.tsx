import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import Button from '../control/Button'
import ParameterTable from './ParameterTable'

interface Props {
    list: ts.NodeArray<ts.ParameterDeclaration>
    parent: ts.SignatureDeclarationBase
}

export default function ParameterDeclarationxx({
    list,
    parent,
}: Props): ReactElement | null {
    const [editing, setEditing] = useState(false)
    if (editing) {
        return (
            <ParameterTable list={list} parent={parent}>
                <Button onClick={() => setEditing(false)} color="red">
                    x
                </Button>
            </ParameterTable>
        )
    }

    if (list.length === 0) {
        return (
            <span
                onClick={(event) => {
                    event.stopPropagation()
                    setEditing(true)
                }}
                className="array-view"
            >
                <span className="prefix">(</span>
                <span className="suffix">)</span>
            </span>
        )
    }

    return (
        <span
            onClick={(event) => {
                event.stopPropagation()
                setEditing(true)
            }}
        >
            <span className="prefix">(</span>
            <span className="cursor-pointer">
                {list.map((node) => node.getText()).join(', ')}
            </span>
            <span className="suffix">)</span>
        </span>
    )
}

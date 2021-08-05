import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import Button from '../control/Button'
import ArgumentTable from './ArgumentTable'
import ArrayView from './ArrayView'

interface Props {
    list: ts.NodeArray<ts.Expression>
    parent: ts.ArrayLiteralExpression | ts.CallExpression | ts.NewExpression
    prefix?: string
    suffix?: string
}

export default function Expressionxx({
    list,
    parent,
    prefix = '(',
    suffix = ')',
}: Props): ReactElement {
    const [editing, setEditing] = useState(false)
    function make(child?: ReactElement) {
        return (
            <span
                onClick={(event) => {
                    event.stopPropagation()
                    setEditing(true)
                }}
                className="array-view"
            >
                <span className="prefix">{prefix}</span>
                <span onClick={(event) => event.stopPropagation()}>
                    {child}
                </span>
                <span className="suffix">{suffix}</span>
            </span>
        )
    }
    if (list === undefined) {
        return make()
    }

    if (editing) {
        if (ts.isArrayLiteralExpression(parent)) {
            return (
                <ArrayView list={list} parent={parent}>
                    <Button onClick={() => setEditing(false)} color="red">
                        x
                    </Button>
                </ArrayView>
            )
        }

        return (
            <ArgumentTable list={list} parent={parent}>
                <Button onClick={() => setEditing(false)} color="red">
                    x
                </Button>
            </ArgumentTable>
        )
    }

    return make(
        <span
            onClick={(event) => {
                event.stopPropagation()
                setEditing(true)
            }}
            className="cursor-pointer"
        >
            {list.map((node) => node.getText()).join(', ')}
        </span>,
    )
}

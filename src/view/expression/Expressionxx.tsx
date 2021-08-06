import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import ObjectChildMenuFactory from '../../helper/Menu/ObjectChildMenuFactory'
import Button from '../control/Button'
import MenuButton from '../control/MenuButton'
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
    if (list === undefined) {
        return <span></span>
    }

    if (editing) {
        if (ts.isArrayLiteralExpression(parent)) {
            return (
                <ArrayView list={list} parent={parent}>
                    <Button onClick={() => setEditing(false)}>x</Button>
                </ArrayView>
            )
        }

        return (
            <ArgumentTable list={list} parent={parent}>
                <Button onClick={() => setEditing(false)}>x</Button>
            </ArgumentTable>
        )
    }

    return (
        <span className="array-view">
            <span
                onClick={(event) => {
                    event.stopPropagation()
                    setEditing(true)
                }}
                className="cursor-pointer"
            >
                <span className="prefix">{prefix}</span>
                {list.map((node) => node.getText()).join(', ')}
            </span>
            <MenuButton factory={ObjectChildMenuFactory(parent)}>
                <span className="suffix">{suffix}</span>
            </MenuButton>
        </span>
    )
}

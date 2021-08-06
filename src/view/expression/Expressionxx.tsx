import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import ObjectChildMenuFactory from '../../helper/Menu/ObjectChildMenuFactory'
import Button from '../control/Button'
import HoverBold from '../control/HoverBold'
import MenuButton from '../control/MenuButton'
import ArgumentTable from './ArgumentTable'
import ArrayBox from './ArrayBox'

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
                <ArrayBox list={list} parent={parent}>
                    <Button onClick={() => setEditing(false)}>x</Button>
                </ArrayBox>
            )
        }

        return (
            <ArgumentTable list={list} parent={parent}>
                <Button onClick={() => setEditing(false)}>x</Button>
            </ArgumentTable>
        )
    }

    return (
        <span>
            <span
                onClick={(event) => {
                    event.stopPropagation()
                    setEditing(true)
                }}
                className="cursor-pointer"
            >
                <HoverBold>{prefix}</HoverBold>
                {list.map((node) => node.getText()).join(', ')}
            </span>
            <MenuButton factory={ObjectChildMenuFactory(parent)}>
                <HoverBold>{suffix}</HoverBold>
            </MenuButton>
        </span>
    )
}

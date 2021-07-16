import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import ExpressionMenuFactory from '../../helper/Menu/ExpressionMenuFactory'
import UniqueKey from '../../helper/UniqueKey'
import Button from '../control/Button'
import MenuButton from '../control/MenuButton'
import ArgumentTable from './ArgumentTable'
import ExpressionRoot from './ExpressionRoot'

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
            >
                {prefix}
                <span onClick={(event) => event.stopPropagation()}>
                    {child}
                </span>
                {suffix}
            </span>
        )
    }
    if (list === undefined) {
        return make()
    }

    const uk = UniqueKey()
    if (editing) {
        if (ts.isArrayLiteralExpression(parent)) {
            return (
                <span>
                    {list.map((item) => (
                        <div key={uk()}>
                            <MenuButton
                                factory={ExpressionMenuFactory(parent, item)}
                            >
                                <span>{item.getText()}</span>
                            </MenuButton>
                        </div>
                    ))}
                </span>
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

    if (list.length === 0) {
        return make()
    }

    const re = list
        .map((item) => {
            return (
                <ExpressionRoot
                    key={uk()}
                    node={item}
                    parent={item.parent}
                ></ExpressionRoot>
            )
        })
        .reduce((previousValue, currentValue): any => {
            return [previousValue, ', ', currentValue]
        })
    return make(re)
}

import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import UniqueKey from '../../helper/UniqueKey'
import Button from '../control/Button'
import ArgumentTable from './ArgumentTable'
import ArrayView from './ArrayView'
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

    if (list.length === 0) {
        return make()
    }

    const uk = UniqueKey()
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

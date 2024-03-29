import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import ObjectChildMenuFactory from '../../helper/Menu/ObjectChildMenuFactory'
import UniqueKey from '../../helper/UniqueKey'
import Button from '../control/Button'
import HoverButton from '../control/HoverButton'
import ObjectChildMenu from '../control/ObjectChildMenu'
import ArgumentTable from './ArgumentTable'
import ArrayBox from './ArrayBox'
import Expression from './Expression'

interface Props {
    list: ts.NodeArray<ts.Expression>
    parent: ts.ArrayLiteralExpression | ts.CallExpression | ts.NewExpression
    root: ts.Expression
    prefix?: string
    suffix?: string
}

export default function Expressionxx({
    list,
    parent,
    root,
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

    const uk = UniqueKey()
    return (
        <span>
            <span
                onClick={(event) => {
                    event.stopPropagation()
                    setEditing(true)
                }}
                className="cursor-pointer"
            >
                <HoverButton color="">{prefix}</HoverButton>
                {list.length === 0
                    ? null
                    : list
                          .map((node) => (
                              <Expression
                                  key={uk()}
                                  node={node}
                                  root={node}
                              ></Expression>
                          ))
                          .reduce((previousValue, currentValue): any => {
                              return [previousValue, ', ', currentValue]
                          })}
            </span>
            <ObjectChildMenu
                factory={ObjectChildMenuFactory}
                node={parent}
                root={root}
            >
                <HoverButton color="">{suffix}</HoverButton>
            </ObjectChildMenu>
        </span>
    )
}

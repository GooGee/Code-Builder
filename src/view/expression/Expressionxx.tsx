import React, { ReactElement, useContext, useState } from 'react'
import ts from 'typescript'
import ExpressionMenuFactory from '../../helper/Menu/ExpressionMenuFactory'
import ExpressionTransformer from '../../helper/Transformer/ExpressionTransformer'
import Transformer from '../../helper/Transformer/Transformer'
import UniqueKey from '../../helper/UniqueKey'
import SourceFileContext from '../context/SourceFileContext'
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
    const context = useContext(SourceFileContext)
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

    const uk = UniqueKey()
    if (editing) {
        if (ts.isArrayLiteralExpression(parent)) {
            return (
                <div className="ml-11 p-2 border-gray-200 border rounded-md">
                    <Button onClick={() => setEditing(false)} color="red">
                        x
                    </Button>

                    {list.map((item) => (
                        <div key={uk()}>
                            <Button
                                onClick={() => {
                                    if (window.confirm('Are you sure:')) {
                                        Transformer.replace(item, undefined)
                                        context.update!()
                                    }
                                }}
                                color="red"
                            >
                                -
                            </Button>
                            <Button
                                onClick={() => {
                                    ExpressionTransformer.addNode(parent, item)
                                    context.update!()
                                }}
                            >
                                +
                            </Button>
                            <MenuButton
                                factory={ExpressionMenuFactory(parent, item)}
                            >
                                <span>{item.getText()}</span>
                            </MenuButton>
                        </div>
                    ))}
                    <div>
                        <Button
                            onClick={() => {
                                ExpressionTransformer.addNode(parent)
                                context.update!()
                            }}
                        >
                            +
                        </Button>
                    </div>
                </div>
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

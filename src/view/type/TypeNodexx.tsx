import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import UniqueKey from '../../helper/UniqueKey'
import Button from '../control/Button'
import TypeArrayView from './TypeArrayView'
import TypeNode from './TypeNode'

interface Props {
    list: ts.NodeArray<ts.TypeNode>
    separator?: string
    parent: ts.HeritageClause | ts.UnionTypeNode
}

export default function TypeNodexx({
    list,
    parent,
    separator = ', ',
}: Props): ReactElement | null {
    const [editing, setEditing] = useState(false)
    if (editing) {
        return (
            <TypeArrayView list={list} parent={parent}>
                <Button onClick={() => setEditing(false)} color="red">
                    x
                </Button>
            </TypeArrayView>
        )
    }

    if (list.length === 0) {
        return null
    }

    const uk = UniqueKey()
    return (
        <span
            onClick={(event) => {
                event.stopPropagation()
                setEditing(true)
            }}
        >
            {list
                .map((item) => {
                    return <TypeNode node={item} key={uk()}></TypeNode>
                })
                .reduce((previousValue, currentValue): any => {
                    return [previousValue, separator, currentValue]
                })}
        </span>
    )
}

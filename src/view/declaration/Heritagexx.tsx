import React, { ReactElement } from 'react'
import ts from 'typescript'
import HeritageClause from '../block/HeritageClause'

interface Props {
    editing: boolean
    list: ts.NodeArray<ts.HeritageClause> | undefined
    parent: ts.ClassDeclaration | ts.InterfaceDeclaration
}

export default function Heritagexx({
    editing,
    list,
    parent,
}: Props): ReactElement | null {
    if (list === undefined) {
        return null
    }

    return (
        <div className="pl-9">
            <HeritageClause
                editing={editing}
                node={list[0]}
                key="aaa"
            ></HeritageClause>
            <HeritageClause
                editing={editing}
                node={list[1]}
                key="bbb"
            ></HeritageClause>
        </div>
    )
}

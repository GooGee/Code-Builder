import React, { ReactElement } from 'react'
import ts from 'typescript'
import HeritageClause from '../block/HeritageClause'

interface Props {
    list: ts.NodeArray<ts.HeritageClause> | undefined
}

export default function Heritagexx({ list }: Props): ReactElement | null {
    if (list === undefined) {
        return null
    }

    return (
        <div className="pl-9">
            <HeritageClause node={list[0]} key="aaa"></HeritageClause>
            <HeritageClause node={list[1]} key="bbb"></HeritageClause>
        </div>
    )
}

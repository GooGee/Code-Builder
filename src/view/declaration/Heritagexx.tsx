import React, { ReactElement } from 'react'
import ts from 'typescript'
import UniqueKey from '../../helper/UniqueKey'
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

    const uk = UniqueKey()
    return (
        <div className="pl-11">
            {list.map((item) => (
                <HeritageClause
                    editing={editing}
                    node={item}
                    key={uk()}
                ></HeritageClause>
            ))}
        </div>
    )
}

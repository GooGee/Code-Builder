import React, { ReactElement } from 'react'
import ts from 'typescript'
import HeritageClauseMenuFactory from '../../helper/Menu/HeritageClauseMenuFactory'
import UniqueKey from '../../helper/UniqueKey'
import HeritageClause from '../block/HeritageClause'
import HoverButton from '../control/HoverButton'
import MenuButton from '../control/MenuButton'

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
    if (editing) {
        if (list === undefined || list.length === 0) {
            return (
                <MenuButton factory={HeritageClauseMenuFactory(parent)}>
                    <HoverButton>+</HoverButton>
                </MenuButton>
            )
        }
    }

    if (list === undefined) {
        return null
    }

    const uk = UniqueKey()
    return (
        <div className="pl-11">
            {list.map((item) => (
                <HeritageClause node={item} key={uk()}></HeritageClause>
            ))}
        </div>
    )
}

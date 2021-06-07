import React, { ReactElement } from 'react'
import ts from 'typescript'
import Keyword from '../text/Keyword'
import TypeNodexx from '../type/TypeNodexx'

interface Props {
    editing: boolean
    node: ts.HeritageClause | undefined
}

export default function HeritageClause({
    editing,
    node,
}: Props): ReactElement | null {
    if (node === undefined) {
        return null
    }

    return (
        <div>
            <Keyword kind={node.token}></Keyword>{' '}
            <TypeNodexx
                editing={editing}
                list={node.types}
                separator=", "
            ></TypeNodexx>
        </div>
    )
}

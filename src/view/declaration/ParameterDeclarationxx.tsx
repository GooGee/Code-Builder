import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import UniqueKey from '../../helper/UniqueKey'
import Button from '../control/Button'
import ParameterDeclaration from './ParameterDeclaration'
import ParameterTable from './ParameterTable'

interface Props {
    list: ts.NodeArray<ts.ParameterDeclaration>
    parent: ts.SignatureDeclarationBase
}

export default function ParameterDeclarationxx({
    list,
    parent,
}: Props): ReactElement | null {
    const [editing, setEditing] = useState(false)
    if (editing) {
        return (
            <ParameterTable list={list} parent={parent}>
                <Button onClick={() => setEditing(false)} color="red">
                    x
                </Button>
            </ParameterTable>
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
            className="array-view"
        >
            <span className="prefix">(</span>
            {list
                .map((item) => (
                    <span key={uk()}>
                        <ParameterDeclaration
                            node={item}
                        ></ParameterDeclaration>
                    </span>
                ))
                .reduce((previousValue, currentValue): any => {
                    return [previousValue, ', ', currentValue]
                })}
            <span className="prefix">)</span>
        </span>
    )
}

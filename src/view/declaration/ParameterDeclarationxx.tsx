import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import Button from '../control/Button'
import HoverBold from '../control/HoverBold'
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
                <Button onClick={() => setEditing(false)}>x</Button>
            </ParameterTable>
        )
    }

    return (
        <span
            onClick={(event) => {
                event.stopPropagation()
                setEditing(true)
            }}
        >
            <HoverBold>(</HoverBold>
            <span className="cursor-pointer">
                {list.length === 0
                    ? null
                    : list
                          .map((node) => (
                              <ParameterDeclaration
                                  node={node}
                              ></ParameterDeclaration>
                          ))
                          .reduce((previousValue, currentValue): any => {
                              return [previousValue, ', ', currentValue]
                          })}
            </span>
            <HoverBold>)</HoverBold>
        </span>
    )
}

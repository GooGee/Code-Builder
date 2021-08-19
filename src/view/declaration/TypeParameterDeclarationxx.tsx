import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import Button from '../control/Button'
import HoverButton from '../control/HoverButton'
import TypeParameterBox from './TypeParameterBox'

interface Props {
    hovering: boolean
    list: ts.NodeArray<ts.TypeParameterDeclaration> | undefined
    parent:
        | ts.ClassDeclaration
        | ts.InterfaceDeclaration
        | ts.FunctionDeclaration
        | ts.MethodDeclaration
        | ts.MethodSignature
}

export default function TypeParameterDeclarationxx({
    hovering,
    list,
    parent,
}: Props): ReactElement | null {
    const [editing, setEditing] = useState(false)
    if (editing) {
        return (
            <TypeParameterBox list={list} parent={parent}>
                <Button onClick={() => setEditing(false)}>x</Button>
            </TypeParameterBox>
        )
    }

    if (hovering) {
        return (
            <span
                onClick={(event) => {
                    event.stopPropagation()
                    setEditing(true)
                }}
            >
                <HoverButton>
                    <span>
                        &lt;
                        {list
                            ? list.map((item) => item.getText()).join(', ')
                            : ''}
                        &gt;
                    </span>
                </HoverButton>{' '}
            </span>
        )
    }

    if (list === undefined) {
        return null
    }
    if (list.length === 0) {
        return null
    }

    return <span>&lt;{list.map((item) => item.getText()).join(', ')}&gt;</span>
}

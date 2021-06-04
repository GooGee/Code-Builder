import React, { ReactElement } from 'react'
import ts from 'typescript'
import refactor from '../../helper/refactor'
import Button from '../control/Button'
import Identifier from './Identifier'

interface Props {
    editing: boolean
    node: ts.Identifier | ts.PrivateIdentifier
}

export default function IdentifierDeclaration({
    editing,
    node,
}: Props): ReactElement {
    if (editing) {
        return (
            <Button
                onClick={() => {
                    const value = prompt('Enter a name', node.text)
                    if (value === null) {
                        return
                    }
                    refactor(node, value)
                }}
            >
                {node.text}
            </Button>
        )
    }

    return <Identifier node={node}></Identifier>
}

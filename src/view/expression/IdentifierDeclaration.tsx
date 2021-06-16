import React, { ReactElement, useContext } from 'react'
import ts from 'typescript'
import refactor from '../../helper/refactor'
import SourceFileContext from '../context/SourceFileContext'
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
    const context = useContext(SourceFileContext)
    if (editing) {
        return (
            <Button
                onClick={() => {
                    const value = prompt('Enter a name', node.text)
                    if (value === null) {
                        return
                    }
                    try {
                        refactor(node, value)
                        context.update!()
                    } catch (error) {
                        alert(error.message)
                    }
                }}
            >
                {node.text}
            </Button>
        )
    }

    return <Identifier node={node}></Identifier>
}

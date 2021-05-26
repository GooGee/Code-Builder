import React, { ReactElement } from 'react'
import ts from 'typescript'
import NameValue from './NameValue'

interface Props {
    editing: boolean
    node: ts.VariableDeclaration
}

export default function VariableDeclaration({
    editing,
    node,
}: Props): ReactElement {
    return <NameValue editing={editing} node={node}></NameValue>
}

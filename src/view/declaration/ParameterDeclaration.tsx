import React, { ReactElement } from 'react'
import ts from 'typescript'
import NameValue from './NameValue'

interface Props {
    editing: boolean
    node: ts.ParameterDeclaration
}

export default function ParameterDeclaration({
    editing,
    node,
}: Props): ReactElement {
    return <NameValue editing={editing} node={node}></NameValue>
}

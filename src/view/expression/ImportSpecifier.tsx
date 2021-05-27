import React, { ReactElement } from 'react'
import ts from 'typescript'
import Identifier from './Identifier'

interface Props {
    editing: boolean
    node: ts.ImportSpecifier
}

export default function ImportSpecifier({
    editing,
    node,
}: Props): ReactElement {
    return <Identifier editing={editing} node={node.name}></Identifier>
}

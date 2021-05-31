import React, { ReactElement } from 'react'
import ts from 'typescript'
import QualifiedName from './QualifiedName'
import TypeIdentifier from './TypeIdentifier'

interface Props {
    editing: boolean
    node: ts.EntityName
}

export default function EntityName({ editing, node }: Props): ReactElement {
    if (ts.isIdentifier(node)) {
        return <TypeIdentifier editing={editing} node={node}></TypeIdentifier>
    }
    if (ts.isQualifiedName(node)) {
        return <QualifiedName editing={editing} node={node}></QualifiedName>
    }

    throw new Error('Unknown EntityName')
}

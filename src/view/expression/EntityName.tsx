import React, { ReactElement } from 'react'
import ts from 'typescript'
import Identifier from './Identifier'
import QualifiedName from './QualifiedName'

interface Props {
    editing: boolean
    node: ts.EntityName
}

export default function EntityName({ editing, node }: Props): ReactElement {
    if (ts.isIdentifier(node)) {
        return <Identifier editing={editing} node={node}></Identifier>
    }
    if (ts.isQualifiedName(node)) {
        return <QualifiedName editing={editing} node={node}></QualifiedName>
    }

    throw new Error('Unknown EntityName')
}

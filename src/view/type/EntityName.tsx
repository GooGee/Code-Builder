import React, { ReactElement } from 'react'
import ts from 'typescript'
import QualifiedName from './QualifiedName'
import TypeIdentifier from './TypeIdentifier'

interface Props {
    node: ts.EntityName
}

export default function EntityName({ node }: Props): ReactElement {
    if (ts.isIdentifier(node)) {
        return <TypeIdentifier node={node}></TypeIdentifier>
    }
    if (ts.isQualifiedName(node)) {
        return <QualifiedName node={node}></QualifiedName>
    }

    throw new Error('Unknown EntityName')
}

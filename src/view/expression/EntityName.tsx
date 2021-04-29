import React, { ReactElement } from 'react'
import ts from 'typescript'
import Identifier from './Identifier'
import QualifiedName from './QualifiedName'

interface Props {
    node: ts.EntityName
}

export default function EntityName({ node }: Props): ReactElement {
    if (ts.isIdentifier(node)) {
        return <Identifier node={node}></Identifier>
    }
    if (ts.isQualifiedName(node)) {
        return <QualifiedName node={node}></QualifiedName>
    }

    throw new Error('Unknown EntityName')
}

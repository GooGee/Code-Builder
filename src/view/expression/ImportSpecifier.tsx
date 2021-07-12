import React, { ReactElement } from 'react'
import ts from 'typescript'
import IdentifierDeclaration from './IdentifierDeclaration'

interface Props {
    node: ts.ImportSpecifier
}

export default function ImportSpecifier({ node }: Props): ReactElement {
    return <IdentifierDeclaration node={node.name}></IdentifierDeclaration>
}

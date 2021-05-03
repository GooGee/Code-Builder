import React, { ReactElement } from 'react'
import ts from 'typescript'
import PropertySignature from './PropertySignature'

interface Props {
    node: ts.PropertyDeclaration
}

export default function PropertyDeclaration({ node }: Props): ReactElement {
    return <PropertySignature node={node}></PropertySignature>
}

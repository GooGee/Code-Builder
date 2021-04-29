import React, { ReactElement } from 'react'
import ts from 'typescript'
import Identifier from './Identifier'

interface Props {
    node: ts.ImportSpecifier
}

export default function ImportSpecifier({ node }: Props): ReactElement {
    return <Identifier node={node.name}></Identifier>
}

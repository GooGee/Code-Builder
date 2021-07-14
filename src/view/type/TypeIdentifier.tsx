import React, { ReactElement } from 'react'
import ts from 'typescript'
import Identifier from '../text/Identifier'

interface Props {
    node: ts.Identifier
}

export default function TypeIdentifier({ node }: Props): ReactElement {
    return <Identifier node={node}></Identifier>
}

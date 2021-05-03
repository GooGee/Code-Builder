import React, { ReactElement } from 'react'
import ts from 'typescript'
import NameValue from './NameValue'

interface Props {
    node: ts.ParameterDeclaration
}

export default function ParameterDeclaration({ node }: Props): ReactElement {
    return <NameValue node={node}></NameValue>
}

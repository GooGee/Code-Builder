import React, { ReactElement } from 'react'
import ts from 'typescript'
import NameValue from './NameValue'

interface Props {
    node: ts.VariableDeclaration
}

export default function VariableDeclaration({ node }: Props): ReactElement {
    return <NameValue node={node}></NameValue>
}

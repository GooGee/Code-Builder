import React, { ReactElement } from 'react'
import ts from 'typescript'
import NameTypeValue from './NameTypeValue'

interface Props {
    node: ts.VariableDeclaration
}

export default function VariableDeclaration({
    node,
}: Props): ReactElement {
    return <NameTypeValue node={node}></NameTypeValue>
}

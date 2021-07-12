import React, { ReactElement } from 'react'
import ts from 'typescript'
import VariableDeclarationList from './VariableDeclarationList'

interface Props {
    node: ts.VariableDeclarationList
}

export default function VDLView({ node }: Props): ReactElement {
    return <VariableDeclarationList node={node}></VariableDeclarationList>
}

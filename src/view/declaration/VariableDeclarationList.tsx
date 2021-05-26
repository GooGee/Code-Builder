import React, { ReactElement } from 'react'
import ts from 'typescript'
import Flag from '../text/Flag'
import VariableDeclarationxx from './VariableDeclarationxx'

interface Props {
    editing: boolean
    node: ts.VariableDeclarationList
}

export default function VariableDeclarationList({
    editing,
    node,
}: Props): ReactElement {
    return (
        <span>
            <Flag node={node}></Flag>{' '}
            <VariableDeclarationxx
                editing={editing}
                list={node.declarations}
            ></VariableDeclarationxx>
        </span>
    )
}

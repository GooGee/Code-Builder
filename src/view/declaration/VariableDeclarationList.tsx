import React, { ReactElement } from 'react'
import ts from 'typescript'
import Flag from '../text/Flag'
import VariableDeclarationxx from './VariableDeclarationxx'

interface Props {
    node: ts.VariableDeclarationList
}

export default function VariableDeclarationList({ node }: Props): ReactElement {
    return (
        <span>
            <Flag node={node}></Flag>{' '}
            <VariableDeclarationxx
                list={node.declarations}
            ></VariableDeclarationxx>
        </span>
    )
}

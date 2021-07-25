import React, { ReactElement } from 'react'
import ts from 'typescript'
import VariableFlag from '../text/VariableFlag'
import VariableDeclarationxx from './VariableDeclarationxx'

interface Props {
    node: ts.VariableDeclarationList
}

export default function VariableDeclarationList({ node }: Props): ReactElement {
    return (
        <span>
            <VariableFlag flags={node.flags} suffix=" "></VariableFlag>
            <VariableDeclarationxx
                list={node.declarations}
            ></VariableDeclarationxx>
        </span>
    )
}

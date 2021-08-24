import React, { ReactElement } from 'react'
import ts from 'typescript'
import { VariableDeclarationMenuFactory } from '../../helper/Menu/StatementMenuFactory'
import MenuButton from '../control/MenuButton'
import VariableFlag from '../text/VariableFlag'
import VariableDeclarationxx from './VariableDeclarationxx'

interface Props {
    node: ts.VariableDeclarationList
}

export default function VariableDeclarationList({ node }: Props): ReactElement {
    return (
        <span>
            <MenuButton factory={() => VariableDeclarationMenuFactory(node)}>
                <VariableFlag flags={node.flags} suffix=" "></VariableFlag>
            </MenuButton>
            <VariableDeclarationxx
                list={node.declarations}
            ></VariableDeclarationxx>
        </span>
    )
}

import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import MenuButton from '../control/MenuButton'
import VariableDeclarationxx from '../declaration/VariableDeclarationxx'
import Modifierxx from '../text/Modifierxx'
import VariableFlag from '../text/VariableFlag'

interface Props {
    node: ts.VariableStatement
}

export default function VariableStatement({ node }: Props): ReactElement {
    return (
        <span>
            <Modifierxx list={node.modifiers}></Modifierxx>
            <MenuButton
                factory={StatementMenuFactory(node.parent as any, node)}
            >
                <VariableFlag
                    flags={node.declarationList.flags}
                    suffix=" "
                ></VariableFlag>
            </MenuButton>
            <VariableDeclarationxx
                list={node.declarationList.declarations}
            ></VariableDeclarationxx>
        </span>
    )
}

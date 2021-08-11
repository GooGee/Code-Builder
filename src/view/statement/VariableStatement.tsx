import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import MenuModal from '../control/MenuModal'
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
            <MenuModal
                factory={StatementMenuFactory(node.parent as any, node)}
            >
                <VariableFlag
                    flags={node.declarationList.flags}
                    suffix=" "
                ></VariableFlag>
            </MenuModal>
            <VariableDeclarationxx
                list={node.declarationList.declarations}
            ></VariableDeclarationxx>
        </span>
    )
}

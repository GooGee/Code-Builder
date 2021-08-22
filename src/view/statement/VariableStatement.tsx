import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import StatementMenu from '../control/StatementMenu'
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
            <StatementMenu
                factory={StatementMenuFactory}
                node={node}
                parent={node.parent as any}
            >
                <VariableFlag
                    flags={node.declarationList.flags}
                    suffix=" "
                ></VariableFlag>
            </StatementMenu>
            <VariableDeclarationxx
                list={node.declarationList.declarations}
            ></VariableDeclarationxx>
        </span>
    )
}

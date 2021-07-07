import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import MenuButton from '../control/MenuButton'
import VDLView from '../declaration/VDLView'
import Modifierxx from '../text/Modifierxx'

interface Props {
    node: ts.VariableStatement
}

export default function VariableStatement({ node }: Props): ReactElement {
    return (
        <span>
            <MenuButton
                factory={StatementMenuFactory(node.parent as any, node)}
            >
                <span className="keyword">define </span>
            </MenuButton>
            <Modifierxx list={node.modifiers}></Modifierxx>
            <VDLView node={node.declarationList}></VDLView>
        </span>
    )
}

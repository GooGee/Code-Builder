import React, { ReactElement } from 'react'
import ts from 'typescript'
import VDLView from '../declaration/VDLView'
import Modifierxx from '../text/Modifierxx'

interface Props {
    editing: boolean
    node: ts.VariableStatement
}

export default function VariableStatement({
    editing,
    node,
}: Props): ReactElement {
    return (
        <span>
            <Modifierxx list={node.modifiers}></Modifierxx>
            <VDLView node={node.declarationList}></VDLView>
        </span>
    )
}

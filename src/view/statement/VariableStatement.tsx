import React, { ReactElement } from 'react'
import ts from 'typescript'
import VDL from '../declaration/VariableDeclarationList'
import Modifierxx from '../text/Modifierxx'

interface Props {
    node: ts.VariableStatement
}

export default function VariableStatement({ node }: Props): ReactElement {
    return (
        <div>
            <Modifierxx list={node.modifiers}></Modifierxx>
            <VDL node={node.declarationList}></VDL>
        </div>
    )
}
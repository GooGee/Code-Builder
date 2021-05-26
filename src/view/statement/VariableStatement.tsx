import React, { ReactElement } from 'react'
import ts from 'typescript'
import VariableDeclarationList from '../declaration/VariableDeclarationList'
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
        <div>
            <Modifierxx list={node.modifiers}></Modifierxx>
            <VariableDeclarationList
                editing={editing}
                node={node.declarationList}
            ></VariableDeclarationList>
        </div>
    )
}

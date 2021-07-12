import React, { ReactElement } from 'react'
import ts from 'typescript'
import EditingView from '../control/EditingView'
import VariableDeclarationList from './VariableDeclarationList'

interface Props {
    node: ts.VariableDeclarationList
}

export default function VDLView({ node }: Props): ReactElement {
    return (
        <EditingView
            viewFactory={(editing) => (
                <VariableDeclarationList
                    node={node}
                ></VariableDeclarationList>
            )}
        ></EditingView>
    )
}

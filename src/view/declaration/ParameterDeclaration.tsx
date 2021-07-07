import React, { ReactElement } from 'react'
import ts from 'typescript'
import EditingView from '../control/EditingView'
import NameValue from './NameValue'

interface Props {
    node: ts.ParameterDeclaration
}

export default function ParameterDeclaration({ node }: Props): ReactElement {
    return (
        <EditingView
            viewFactory={(editing) => (
                <NameValue editing={editing} node={node}></NameValue>
            )}
        ></EditingView>
    )
}

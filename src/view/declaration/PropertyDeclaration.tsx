import React, { ReactElement } from 'react'
import ts from 'typescript'
import Modifierxx from '../text/Modifierxx'
import NameValue from './NameValue'

interface Props {
    editing: boolean
    node: ts.PropertyDeclaration
}

export default function PropertyDeclaration({
    editing,
    node,
}: Props): ReactElement {
    return (
        <span>
            <Modifierxx list={node.modifiers}></Modifierxx>{' '}
            <NameValue editing={editing} node={node}></NameValue>
        </span>
    )
}

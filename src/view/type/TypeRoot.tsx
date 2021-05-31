import React, { ReactElement } from 'react'
import ts from 'typescript'
import TypeMenuFactory from '../../helper/Menu/TypeMenuFactory'
import MenuButton from '../control/MenuButton'
import TypeNode from './TypeNode'

interface Props {
    editing: boolean
    node?: ts.TypeNode
    parent: ts.Node
    propertyName?: string
}

export default function TypeRoot({
    editing,
    node,
    parent,
    propertyName = 'type',
}: Props): ReactElement {
    if (node === undefined) {
        return (
            <span>
                <MenuButton
                    factory={TypeMenuFactory(parent, node, propertyName)}
                    text="+ Type"
                    visible={true}
                ></MenuButton>
            </span>
        )
    }

    return (
        <span>
            <MenuButton
                factory={TypeMenuFactory(parent, node, propertyName)}
                visible={true}
            ></MenuButton>

            <TypeNode editing={editing} node={node}></TypeNode>
        </span>
    )
}

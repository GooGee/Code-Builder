import React, { ReactElement } from 'react'
import ts from 'typescript'
import TypeMenuFactory from '../../helper/Menu/TypeMenuFactory'
import MenuButton from '../control/MenuButton'
import TypeNode from './TypeNode'

interface Props {
    node?: ts.TypeNode
    parent: ts.Node
    propertyName?: string
}

export default function TypeRoot({
    node,
    parent,
    propertyName = 'type',
}: Props): ReactElement {
    if (node === undefined) {
        return (
            <MenuButton
                factory={TypeMenuFactory(parent, node, propertyName)}
                visible={true}
            >
                <span className="cursor-pointer px-2 text-gray-50 hover:text-red-500">
                    *
                </span>
            </MenuButton>
        )
    }

    return <TypeNode node={node}></TypeNode>
}

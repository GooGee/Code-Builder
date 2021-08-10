import React, { ReactElement } from 'react'
import ts from 'typescript'
import TypeMenuFactory from '../../helper/Menu/TypeMenuFactory'
import MenuModal from '../control/MenuModal'
import TextButton from '../control/TextButton'
import TypeNode from './TypeNode'

interface Props {
    editing?: boolean
    node?: ts.TypeNode
    parent: ts.Node
    required?: boolean
}

export default function TypeRoot({
    editing = false,
    node,
    parent,
    required = false,
}: Props): ReactElement {
    return (
        <MenuModal factory={TypeMenuFactory(parent, node, required)}>
            {node === undefined ? (
                editing ? (
                    <TextButton></TextButton>
                ) : (
                    <span></span>
                )
            ) : (
                <TypeNode node={node}></TypeNode>
            )}
        </MenuModal>
    )
}

import React, { ReactElement } from 'react'
import ts from 'typescript'
import TypeMenuFactory from '../../helper/Menu/TypeMenuFactory'
import MenuModal from '../control/MenuModal'
import TextButton from '../control/TextButton'
import TypeNode from './TypeNode'

interface Props {
    node?: ts.TypeNode
    parent: ts.Node
    editing?: boolean
}

export default function TypeRoot({
    node,
    parent,
    editing = false,
}: Props): ReactElement {
    return (
        <MenuModal factory={TypeMenuFactory(parent, node)}>
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

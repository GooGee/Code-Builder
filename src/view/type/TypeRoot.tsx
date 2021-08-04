import React, { ReactElement } from 'react'
import ts from 'typescript'
import TypeMenuFactory from '../../helper/Menu/TypeMenuFactory'
import HoverStar from '../control/HoverStar'
import MenuModal from '../control/MenuModal'
import TextButton from '../control/TextButton'
import TypeNode from './TypeNode'

interface Props {
    node?: ts.TypeNode
    parent: ts.Node
    visible?: boolean
}

export default function TypeRoot({
    node,
    parent,
    visible = false,
}: Props): ReactElement {
    return (
        <MenuModal factory={TypeMenuFactory(parent, node)}>
            {node === undefined ? (
                visible ? (
                    <TextButton></TextButton>
                ) : (
                    <HoverStar></HoverStar>
                )
            ) : (
                <TypeNode node={node}></TypeNode>
            )}
        </MenuModal>
    )
}

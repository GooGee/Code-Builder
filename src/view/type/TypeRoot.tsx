import React, { ReactElement } from 'react'
import ts from 'typescript'
import TypeMenuFactory from '../../helper/Menu/TypeMenuFactory'
import HoverStar from '../control/HoverStar'
import MenuButton from '../control/MenuButton'
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
        <MenuButton factory={TypeMenuFactory(parent, node)}>
            {node === undefined ? (
                visible ? (
                    <TextButton></TextButton>
                ) : (
                    <HoverStar></HoverStar>
                )
            ) : (
                <TypeNode node={node}></TypeNode>
            )}
        </MenuButton>
    )
}

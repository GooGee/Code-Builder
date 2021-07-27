import React, { ReactElement } from 'react'
import ts from 'typescript'
import TypeMenuFactory from '../../helper/Menu/TypeMenuFactory'
import HoverStar from '../control/HoverStar'
import MenuButton from '../control/MenuButton'
import TypeNode from './TypeNode'

interface Props {
    node?: ts.TypeNode
    parent: ts.Node
}

export default function TypeRoot({ node, parent }: Props): ReactElement {
    return (
        <span>
            <MenuButton factory={TypeMenuFactory(parent, node)}>
                <HoverStar></HoverStar>
            </MenuButton>
            {node === undefined ? null : <TypeNode node={node}></TypeNode>}
        </span>
    )
}

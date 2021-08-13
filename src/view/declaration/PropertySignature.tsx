import React, { ReactElement } from 'react'
import ts from 'typescript'
import InterfaceMenuFactory from '../../helper/Menu/InterfaceMenuFactory'
import HoverButton from '../control/HoverButton'
import MenuButton from '../control/MenuButton'
import Modifierxx from '../text/Modifierxx'
import NameTypeValue from './NameTypeValue'

interface Props {
    node: ts.PropertySignature
    parent: ts.InterfaceDeclaration
}

export default function PropertySignature({
    node,
    parent,
}: Props): ReactElement {
    return (
        <div>
            <Modifierxx list={node.modifiers}></Modifierxx>
            <MenuButton factory={InterfaceMenuFactory(parent, node)}>
                <HoverButton> p </HoverButton>
            </MenuButton>
            <NameTypeValue node={node}></NameTypeValue>
        </div>
    )
}

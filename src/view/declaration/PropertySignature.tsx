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
        <div className="hover-bg">
            <MenuButton factory={() => InterfaceMenuFactory(parent, node)}>
                <HoverButton> p </HoverButton>
            </MenuButton>
            <Modifierxx list={node.modifiers}></Modifierxx>
            <NameTypeValue node={node}></NameTypeValue>
        </div>
    )
}

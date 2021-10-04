import React, { ReactElement } from 'react'
import ts from 'typescript'
import ClassMenuFactory from '../../helper/Menu/ClassMenuFactory'
import HoverButton from '../control/HoverButton'
import MenuButton from '../control/MenuButton'
import Modifierxx from '../text/Modifierxx'
import NameTypeValue from './NameTypeValue'

interface Props {
    node: ts.PropertyDeclaration
    parent: ts.ClassLikeDeclaration
}

export default function PropertyDeclaration({
    node,
    parent,
}: Props): ReactElement {
    return (
        <div className="hover-bg">
            <MenuButton factory={() => ClassMenuFactory(parent, node)}>
                <HoverButton> p </HoverButton>
            </MenuButton>
            {node.modifiers === undefined ? null : (
                <span>
                    <Modifierxx list={node.modifiers}></Modifierxx>{' '}
                </span>
            )}
            <NameTypeValue node={node}></NameTypeValue>
        </div>
    )
}

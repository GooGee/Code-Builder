import React, { ReactElement, useState } from 'react'
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
    const [hovering, setHovering] = useState(false)
    return (
        <div>
            <Modifierxx list={node.modifiers}></Modifierxx>
            <span
                onMouseEnter={(event) => setHovering(true)}
                onMouseLeave={(event) => setHovering(false)}
            >
                {hovering ? (
                    <MenuButton factory={() => ClassMenuFactory(parent, node)}>
                        <HoverButton> p </HoverButton>
                    </MenuButton>
                ) : null}
                <NameTypeValue node={node}></NameTypeValue>
            </span>
        </div>
    )
}

import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import ClassMenuFactory from '../../helper/Menu/ClassMenuFactory'
import Block from '../block/Block'
import HoverButton from '../control/HoverButton'
import MenuButton from '../control/MenuButton'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
import Colon from '../text/Colon'
import Modifierxx from '../text/Modifierxx'
import TypeRoot from '../type/TypeRoot'

interface Props {
    node: ts.GetAccessorDeclaration
    parent: ts.ClassLikeDeclaration
}

export default function GetAccessorDeclaration({
    node,
    parent,
}: Props): ReactElement {
    const [hovering, setHovering] = useState(false)
    return (
        <div>
            <span
                onMouseEnter={(event) => setHovering(true)}
                onMouseLeave={(event) => setHovering(false)}
            >
                {hovering ? (
                    <MenuButton factory={() => ClassMenuFactory(parent, node)}>
                        <HoverButton> g </HoverButton>
                    </MenuButton>
                ) : null}
                {node.modifiers === undefined ? null : (
                    <span>
                        <Modifierxx list={node.modifiers}></Modifierxx>{' '}
                    </span>
                )}
                <IdentifierDeclaration
                    node={node.name as any}
                ></IdentifierDeclaration>
            </span>
            {node.type === undefined ? null : (
                <>
                    <Colon></Colon>{' '}
                    <TypeRoot node={node.type} parent={node}></TypeRoot>
                </>
            )}{' '}
            <Block node={node.body}></Block>
        </div>
    )
}

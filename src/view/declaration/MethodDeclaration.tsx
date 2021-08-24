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
import ParameterDeclarationxx from './ParameterDeclarationxx'
import TypeParameterDeclarationxx from './TypeParameterDeclarationxx'

interface Props {
    node: ts.MethodDeclaration
    parent: ts.ClassLikeDeclaration
}

export default function MethodDeclaration({
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
                        <HoverButton> m </HoverButton>
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
                <TypeParameterDeclarationxx
                    hovering={hovering}
                    list={node.typeParameters}
                    parent={node}
                ></TypeParameterDeclarationxx>
                <ParameterDeclarationxx
                    list={node.parameters}
                    parent={node}
                ></ParameterDeclarationxx>
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

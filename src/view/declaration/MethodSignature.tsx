import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import InterfaceMenuFactory from '../../helper/Menu/InterfaceMenuFactory'
import HoverButton from '../control/HoverButton'
import MenuButton from '../control/MenuButton'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
import Colon from '../text/Colon'
import Modifierxx from '../text/Modifierxx'
import TypeRoot from '../type/TypeRoot'
import ParameterDeclarationxx from './ParameterDeclarationxx'
import TypeParameterDeclarationxx from './TypeParameterDeclarationxx'

interface Props {
    node: ts.MethodSignature
    parent: ts.InterfaceDeclaration
}

export default function MethodSignature({ node, parent }: Props): ReactElement {
    const [hovering, setHovering] = useState(false)
    return (
        <div>
            <Modifierxx list={node.modifiers}></Modifierxx>
            <span
                onMouseEnter={(event) => setHovering(true)}
                onMouseLeave={(event) => setHovering(false)}
            >
                {hovering ? (
                    <MenuButton factory={() => InterfaceMenuFactory(parent, node)}>
                        <HoverButton> m </HoverButton>
                    </MenuButton>
                ) : null}
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
                    <TypeRoot
                        node={node.type}
                        parent={node}
                        required={true}
                    ></TypeRoot>
                </>
            )}
        </div>
    )
}

import React, { ReactElement } from 'react'
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
    return (
        <div>
            <Modifierxx list={node.modifiers}></Modifierxx>
            <MenuButton factory={ClassMenuFactory(parent, node)}>
                <HoverButton> m </HoverButton>
            </MenuButton>
            <IdentifierDeclaration
                node={node.name as any}
            ></IdentifierDeclaration>
            <TypeParameterDeclarationxx
                list={node.typeParameters}
            ></TypeParameterDeclarationxx>
            <ParameterDeclarationxx
                list={node.parameters}
                parent={node}
            ></ParameterDeclarationxx>
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

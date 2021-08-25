import React, { ReactElement } from 'react'
import ts from 'typescript'
import ClassMenuFactory from '../../helper/Menu/ClassMenuFactory'
import Block from '../block/Block'
import MenuButton from '../control/MenuButton'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
import Keyword from '../text/Keyword'
import Modifierxx from '../text/Modifierxx'
import ParameterDeclarationxx from './ParameterDeclarationxx'

interface Props {
    node: ts.SetAccessorDeclaration
    parent: ts.ClassLikeDeclaration
}

export default function SetAccessorDeclaration({
    node,
    parent,
}: Props): ReactElement {
    return (
        <div>
            <MenuButton factory={() => ClassMenuFactory(parent, node)}>
                <Keyword kind={node.kind} suffix=" "></Keyword>
            </MenuButton>
            {node.modifiers === undefined ? null : (
                <span>
                    <Modifierxx list={node.modifiers}></Modifierxx>{' '}
                </span>
            )}
            <IdentifierDeclaration
                node={node.name as any}
            ></IdentifierDeclaration>
            <ParameterDeclarationxx
                list={node.parameters}
                parent={node}
            ></ParameterDeclarationxx>{' '}
            <Block node={node.body}></Block>
        </div>
    )
}

import React, { ReactElement } from 'react'
import ts from 'typescript'
import ClassMenuFactory from '../../helper/Menu/ClassMenuFactory'
import Block from '../block/Block'
import MenuButton from '../control/MenuButton'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
import Colon from '../text/Colon'
import Keyword from '../text/Keyword'
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

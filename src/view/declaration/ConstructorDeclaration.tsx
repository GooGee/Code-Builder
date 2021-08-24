import React, { ReactElement } from 'react'
import ts from 'typescript'
import ClassMenuFactory from '../../helper/Menu/ClassMenuFactory'
import Block from '../block/Block'
import MenuButton from '../control/MenuButton'
import Keyword from '../text/Keyword'
import Modifierxx from '../text/Modifierxx'
import ParameterDeclarationxx from './ParameterDeclarationxx'

interface Props {
    node: ts.ConstructorDeclaration
}

export default function ConstructorDeclaration({ node }: Props): ReactElement {
    return (
        <div>
            <Modifierxx list={node.modifiers}></Modifierxx>{' '}
            <MenuButton factory={() => ClassMenuFactory(node.parent, node)}>
                <Keyword kind={node.kind}></Keyword>
            </MenuButton>
            <ParameterDeclarationxx
                list={node.parameters}
                parent={node}
            ></ParameterDeclarationxx>{' '}
            <Block node={node.body}></Block>
        </div>
    )
}

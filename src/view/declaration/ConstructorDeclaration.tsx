import React, { ReactElement } from 'react'
import ts from 'typescript'
import Block from '../block/Block'
import Keyword from '../text/Keyword'
import Modifierxx from '../text/Modifierxx'
import ParameterDeclarationxx from './ParameterDeclarationxx'

interface Props {
    editing: boolean
    node: ts.ConstructorDeclaration
}

export default function ConstructorDeclaration({
    editing,
    node,
}: Props): ReactElement {
    return (
        <div>
            <Modifierxx list={node.modifiers}></Modifierxx>{' '}
            <Keyword kind={node.kind}></Keyword>
            <ParameterDeclarationxx
                editing={editing}
                list={node.parameters}
                parent={node}
            ></ParameterDeclarationxx>
            <Block node={node.body}></Block>
        </div>
    )
}

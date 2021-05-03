import React, { ReactElement } from 'react'
import ts from 'typescript'
import Block from '../block/Block'
import Keyword from '../text/Keyword'
import Modifierxx from '../text/Modifierxx'
import ParameterDeclarationxx from './ParameterDeclarationxx'

interface Props {
    node: ts.ConstructorDeclaration
}

export default function ConstructorDeclaration({ node }: Props): ReactElement {
    return (
        <div>
            <Modifierxx list={node.modifiers}></Modifierxx>
            {' '}
            <Keyword kind={node.kind}></Keyword>
            <ParameterDeclarationxx
                list={node.parameters}
            ></ParameterDeclarationxx>
            <Block node={node.body}></Block>
        </div>
    )
}
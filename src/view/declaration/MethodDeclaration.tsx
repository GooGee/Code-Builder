import React, { ReactElement } from 'react'
import ts from 'typescript'
import Block from '../block/Block'
import Identifier from '../expression/Identifier'
import Colon from '../text/Colon'
import Modifierxx from '../text/Modifierxx'
import TypeNode from '../type/TypeNode'
import ParameterDeclarationxx from './ParameterDeclarationxx'
import TypeParameterDeclarationxx from './TypeParameterDeclarationxx'

interface Props {
    node: ts.MethodDeclaration
}

export default function MethodDeclaration({ node }: Props): ReactElement {
    return (
        <div>
            <Modifierxx list={node.modifiers}></Modifierxx>{' '}
            <Identifier node={node.name as any}></Identifier>
            <TypeParameterDeclarationxx
                list={node.typeParameters}
            ></TypeParameterDeclarationxx>
            <ParameterDeclarationxx
                list={node.parameters}
            ></ParameterDeclarationxx>
            <Colon></Colon> <TypeNode node={node.type}></TypeNode>
            <Block node={node.body}></Block>
        </div>
    )
}

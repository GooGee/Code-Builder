import React, { ReactElement } from 'react'
import ts from 'typescript'
import Block from '../block/Block'
import Identifier from '../expression/Identifier'
import Colon from '../text/Colon'
import Keyword from '../text/Keyword'
import TypeNode from '../type/TypeNode'
import ParameterDeclarationxx from './ParameterDeclarationxx'
import TypeParameterDeclarationxx from './TypeParameterDeclarationxx'

interface Props {
    node: ts.FunctionDeclaration
}

export default function FunctionDeclaration({ node }: Props): ReactElement {
    return (
        <div>
            <Keyword kind={node.kind}></Keyword>{' '}
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

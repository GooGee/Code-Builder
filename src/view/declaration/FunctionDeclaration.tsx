import React, { ReactElement } from 'react'
import ts from 'typescript'
import Block from '../block/Block'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
import Colon from '../text/Colon'
import Keyword from '../text/Keyword'
import TypeNode from '../type/TypeNode'
import ParameterDeclarationxx from './ParameterDeclarationxx'
import TypeParameterDeclarationxx from './TypeParameterDeclarationxx'

interface Props {
    editing: boolean
    node: ts.FunctionDeclaration
}

export default function FunctionDeclaration({
    editing,
    node,
}: Props): ReactElement {
    return (
        <div>
            <Keyword kind={node.kind}></Keyword>{' '}
            <IdentifierDeclaration
                editing={editing}
                node={node.name as any}
            ></IdentifierDeclaration>
            <TypeParameterDeclarationxx
                editing={editing}
                list={node.typeParameters}
            ></TypeParameterDeclarationxx>
            <ParameterDeclarationxx
                editing={editing}
                list={node.parameters}
            ></ParameterDeclarationxx>
            <Colon></Colon> <TypeNode node={node.type}></TypeNode>
            <Block node={node.body}></Block>
        </div>
    )
}

import React, { ReactElement } from 'react'
import ts from 'typescript'
import Block from '../block/Block'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
import Colon from '../text/Colon'
import Keyword from '../text/Keyword'
import TypeRoot from '../type/TypeRoot'
import ParameterDeclarationxx from './ParameterDeclarationxx'
import TypeParameterDeclarationxx from './TypeParameterDeclarationxx'

interface Props {
    node: ts.FunctionDeclaration
}

export default function FunctionDeclaration({ node }: Props): ReactElement {
    const editing = false
    return (
        <div>
            <Keyword kind={node.kind} suffix=" "></Keyword>
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
            <Colon></Colon>{' '}
            <TypeRoot
                editing={editing}
                node={node.type}
                parent={node}
            ></TypeRoot>
            <Block node={node.body}></Block>
        </div>
    )
}

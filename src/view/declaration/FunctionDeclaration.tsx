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

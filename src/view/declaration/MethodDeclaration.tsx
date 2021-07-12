import React, { ReactElement } from 'react'
import ts from 'typescript'
import Block from '../block/Block'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
import Colon from '../text/Colon'
import Modifierxx from '../text/Modifierxx'
import TypeRoot from '../type/TypeRoot'
import ParameterDeclarationxx from './ParameterDeclarationxx'
import TypeParameterDeclarationxx from './TypeParameterDeclarationxx'

interface Props {
    node: ts.MethodDeclaration
}

export default function MethodDeclaration({ node }: Props): ReactElement {
    return (
        <div>
            <Modifierxx list={node.modifiers}></Modifierxx>{' '}
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
            <Colon></Colon> <TypeRoot node={node.type} parent={node}></TypeRoot>
            <Block node={node.body}></Block>
        </div>
    )
}

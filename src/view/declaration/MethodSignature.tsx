import React, { ReactElement } from 'react'
import ts from 'typescript'
import Identifier from '../expression/Identifier'
import Colon from '../text/Colon'
import TypeNode from '../type/TypeNode'
import ParameterDeclarationxx from './ParameterDeclarationxx'
import TypeParameterDeclarationxx from './TypeParameterDeclarationxx'

interface Props {
    node: ts.MethodSignature
}

export default function MethodSignature({ node }: Props): ReactElement {
    return (
        <div>
            <Identifier node={node.name as any}></Identifier>
            <TypeParameterDeclarationxx
                list={node.typeParameters}
            ></TypeParameterDeclarationxx>
            <ParameterDeclarationxx
                list={node.parameters}
            ></ParameterDeclarationxx>
            <Colon></Colon> <TypeNode node={node.type}></TypeNode>
        </div>
    )
}

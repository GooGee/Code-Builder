import React, { ReactElement } from 'react'
import ts from 'typescript'
import ClassMenuFactory from '../../helper/Menu/ClassMenuFactory'
import Block from '../block/Block'
import StatementLine from '../control/StatementLine'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
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
            <StatementLine
                menuFactory={ClassMenuFactory(node.parent as any, node)}
            >
                <Modifierxx list={node.modifiers}></Modifierxx>{' '}
                <IdentifierDeclaration
                    node={node.name as any}
                ></IdentifierDeclaration>
                <TypeParameterDeclarationxx
                    list={node.typeParameters}
                ></TypeParameterDeclarationxx>
                <ParameterDeclarationxx
                    list={node.parameters}
                ></ParameterDeclarationxx>
                <Colon></Colon> <TypeNode node={node.type}></TypeNode>
            </StatementLine>

            <Block node={node.body}></Block>
        </div>
    )
}

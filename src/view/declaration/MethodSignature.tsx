import React, { ReactElement } from 'react'
import ts from 'typescript'
import InterfaceMenuFactory from '../../helper/Menu/InterfaceMenuFactory'
import StatementLine from '../control/StatementLine'
import Identifier from '../expression/Identifier'
import Colon from '../text/Colon'
import Modifierxx from '../text/Modifierxx'
import TypeNode from '../type/TypeNode'
import ParameterDeclarationxx from './ParameterDeclarationxx'
import TypeParameterDeclarationxx from './TypeParameterDeclarationxx'

interface Props {
    node: ts.MethodSignature
}

export default function MethodSignature({ node }: Props): ReactElement {
    return (
        <StatementLine
            menuFactory={InterfaceMenuFactory(node.parent as any, node)}
        >
            <Modifierxx list={node.modifiers}></Modifierxx>{' '}
            <Identifier node={node.name as any}></Identifier>
            <TypeParameterDeclarationxx
                list={node.typeParameters}
            ></TypeParameterDeclarationxx>
            <ParameterDeclarationxx
                list={node.parameters}
            ></ParameterDeclarationxx>
            {node.type ? (
                <>
                    <Colon></Colon> <TypeNode node={node.type}></TypeNode>
                </>
            ) : (
                ''
            )}
        </StatementLine>
    )
}

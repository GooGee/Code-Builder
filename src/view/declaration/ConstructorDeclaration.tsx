import React, { ReactElement } from 'react'
import ts from 'typescript'
import ClassMenuFactory from '../../helper/Menu/ClassMenuFactory'
import Block from '../block/Block'
import DeclarationLine from '../control/DeclarationLine'
import Keyword from '../text/Keyword'
import Modifierxx from '../text/Modifierxx'
import ParameterDeclarationxx from './ParameterDeclarationxx'

interface Props {
    node: ts.ConstructorDeclaration
}

export default function ConstructorDeclaration({ node }: Props): ReactElement {
    return (
        <div>
            <DeclarationLine
                factory={ClassMenuFactory(node.parent as any, node)}
            >
                <Modifierxx list={node.modifiers}></Modifierxx>{' '}
                <Keyword kind={node.kind}></Keyword>
                <ParameterDeclarationxx
                    list={node.parameters}
                ></ParameterDeclarationxx>
            </DeclarationLine>

            <Block node={node.body}></Block>
        </div>
    )
}

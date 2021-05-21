import React, { ReactElement } from 'react'
import ts from 'typescript'
import ClassMenuFactory from '../../helper/Menu/ClassMenuFactory'
import Block from '../block/Block'
import StatementLine from '../control/StatementLine'
import Keyword from '../text/Keyword'
import Modifierxx from '../text/Modifierxx'
import ParameterDeclarationxx from './ParameterDeclarationxx'

interface Props {
    node: ts.ConstructorDeclaration
}

export default function ConstructorDeclaration({ node }: Props): ReactElement {
    return (
        <div>
            <StatementLine
                factory={ClassMenuFactory(node.parent as any, node)}
            >
                <Modifierxx list={node.modifiers}></Modifierxx>{' '}
                <Keyword kind={node.kind}></Keyword>
                <ParameterDeclarationxx
                    list={node.parameters}
                ></ParameterDeclarationxx>
            </StatementLine>

            <Block node={node.body}></Block>
        </div>
    )
}

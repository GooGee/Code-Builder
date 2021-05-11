import React, { ReactElement } from 'react'
import ts from 'typescript'
import ClassMenuFactory from '../../helper/Menu/ClassMenuFactory'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import UniqueKey from '../../helper/UniqueKey'
import LineButton from '../control/LineButton'
import Identifier from '../expression/Identifier'
import Statement from '../statement/Statement'
import Colon from '../text/Colon'
import Modifierxx from '../text/Modifierxx'
import TypeNode from '../type/TypeNode'
import ParameterDeclarationxx from './ParameterDeclarationxx'
import TypeParameterDeclarationxx from './TypeParameterDeclarationxx'

interface Props {
    node: ts.MethodDeclaration
}

export default function MethodDeclaration({ node }: Props): ReactElement {
    const uk = UniqueKey()
    return (
        <div>
            <LineButton
                factory={ClassMenuFactory(node.parent as any, node)}
            ></LineButton>
            <Modifierxx list={node.modifiers}></Modifierxx>{' '}
            <Identifier node={node.name as any}></Identifier>
            <TypeParameterDeclarationxx
                list={node.typeParameters}
            ></TypeParameterDeclarationxx>
            <ParameterDeclarationxx
                list={node.parameters}
            ></ParameterDeclarationxx>
            <Colon></Colon> <TypeNode node={node.type}></TypeNode>
            <br />
            {'{'}
            <div className="pl-9">
                {node.body?.statements.map((item) => {
                    return <Statement node={item} key={uk()}></Statement>
                })}
                <LineButton
                    factory={StatementMenuFactory(node.body!)}
                ></LineButton>
            </div>
            {'}'}
        </div>
    )
}

import React, { ReactElement } from 'react'
import ts from 'typescript'
import Identifier from '../expression/Identifier'
import Keyword from '../text/Keyword'
import Modifierxx from '../text/Modifierxx'
import Declarationxx from './Declarationxx'
import Heritagexx from './Heritagexx'
import TypeParameterDeclarationxx from './TypeParameterDeclarationxx'

interface Props {
    node: ts.ClassDeclaration
}

export default function ClassDeclaration({ node }: Props): ReactElement {
    return (
        <div>
            <div>
                <Modifierxx list={node.modifiers}></Modifierxx>{' '}
                <Keyword kind={node.kind}></Keyword>{' '}
                <Identifier node={node.name!}></Identifier>
                <TypeParameterDeclarationxx
                    list={node.typeParameters}
                ></TypeParameterDeclarationxx>
            </div>
            <Heritagexx list={node.heritageClauses}></Heritagexx>
            {'{'}
            <Declarationxx list={node.members as any}></Declarationxx>
            {'}'}
        </div>
    )
}

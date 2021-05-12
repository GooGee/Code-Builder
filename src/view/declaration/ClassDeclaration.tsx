import React, { ReactElement } from 'react'
import ts from 'typescript'
import ClassMenuFactory from '../../helper/Menu/ClassMenuFactory'
import SourceFileMenuFactory from '../../helper/Menu/SourceFileMenuFactory'
import UniqueKey from '../../helper/UniqueKey'
import DeclarationLine from '../control/DeclarationLine'
import LineButton from '../control/LineButton'
import Identifier from '../expression/Identifier'
import Keyword from '../text/Keyword'
import Modifierxx from '../text/Modifierxx'
import ConstructorDeclaration from './ConstructorDeclaration'
import Heritagexx from './Heritagexx'
import MethodDeclaration from './MethodDeclaration'
import PropertyDeclaration from './PropertyDeclaration'
import TypeParameterDeclarationxx from './TypeParameterDeclarationxx'

interface Props {
    node: ts.ClassDeclaration
}

export default function ClassDeclaration({ node }: Props): ReactElement {
    const uk = UniqueKey()
    return (
        <div>
            <DeclarationLine factory={SourceFileMenuFactory(node)}>
                <Modifierxx list={node.modifiers}></Modifierxx>{' '}
                <Keyword kind={node.kind}></Keyword>{' '}
                <Identifier node={node.name!}></Identifier>
                <TypeParameterDeclarationxx
                    list={node.typeParameters}
                ></TypeParameterDeclarationxx>
            </DeclarationLine>

            <Heritagexx list={node.heritageClauses}></Heritagexx>

            {'{'}
            <div className="pl-9">
                {node.members.map((item) =>
                    ts.isConstructorDeclaration(item) ? (
                        <ConstructorDeclaration
                            node={item}
                            key={uk()}
                        ></ConstructorDeclaration>
                    ) : ts.isMethodDeclaration(item) ? (
                        <MethodDeclaration
                            node={item}
                            key={uk()}
                        ></MethodDeclaration>
                    ) : ts.isPropertyDeclaration(item) ? (
                        <PropertyDeclaration
                            node={item}
                            key={uk()}
                        ></PropertyDeclaration>
                    ) : null,
                )}
                <LineButton
                    visible={true}
                    factory={ClassMenuFactory(node)}
                ></LineButton>
            </div>
            {'}'}
        </div>
    )
}

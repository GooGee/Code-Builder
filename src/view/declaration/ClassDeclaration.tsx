import React, { ReactElement } from 'react'
import ts from 'typescript'
import ClassMenuFactory from '../../helper/Menu/ClassMenuFactory'
import SourceFileMenuFactory from '../../helper/Menu/SourceFileMenuFactory'
import UniqueKey from '../../helper/UniqueKey'
import LineButton from '../control/LineButton'
import Identifier from '../expression/Identifier'
import Keyword from '../text/Keyword'
import Modifierxx from '../text/Modifierxx'
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
            <div>
                <LineButton factory={SourceFileMenuFactory(node)}></LineButton>
                <Modifierxx list={node.modifiers}></Modifierxx>{' '}
                <Keyword kind={node.kind}></Keyword>{' '}
                <Identifier node={node.name!}></Identifier>
                <TypeParameterDeclarationxx
                    list={node.typeParameters}
                ></TypeParameterDeclarationxx>
            </div>
            <Heritagexx list={node.heritageClauses}></Heritagexx>
            {'{'}
            <div className="pl-9">
                {node.members.map((item) =>
                    ts.isMethodDeclaration(item) ? (
                        <MethodDeclaration
                            node={item as any}
                            key={uk()}
                        ></MethodDeclaration>
                    ) : (
                        <PropertyDeclaration
                            node={item as any}
                            key={uk()}
                        ></PropertyDeclaration>
                    ),
                )}
                <LineButton factory={ClassMenuFactory(node)}></LineButton>
            </div>
            {'}'}
        </div>
    )
}

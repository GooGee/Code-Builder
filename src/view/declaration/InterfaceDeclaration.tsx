import React, { ReactElement } from 'react'
import ts from 'typescript'
import InterfaceMenuFactory from '../../helper/Menu/InterfaceMenuFactory'
import SourceFileMenuFactory from '../../helper/Menu/SourceFileMenuFactory'
import UniqueKey from '../../helper/UniqueKey'
import DeclarationLine from '../control/DeclarationLine'
import MenuButton from '../control/MenuButton'
import Identifier from '../expression/Identifier'
import Keyword from '../text/Keyword'
import Modifierxx from '../text/Modifierxx'
import Heritagexx from './Heritagexx'
import MethodSignature from './MethodSignature'
import PropertySignature from './PropertySignature'
import TypeParameterDeclarationxx from './TypeParameterDeclarationxx'

interface Props {
    node: ts.InterfaceDeclaration
}

export default function InterfaceDeclaration({ node }: Props): ReactElement {
    const uk = UniqueKey()
    return (
        <div>
            <DeclarationLine factory={SourceFileMenuFactory(node)}>
                <Modifierxx list={node.modifiers}></Modifierxx>{' '}
                <Keyword kind={node.kind}></Keyword>{' '}
                <Identifier node={node.name}></Identifier>
                <TypeParameterDeclarationxx
                    list={node.typeParameters}
                ></TypeParameterDeclarationxx>
            </DeclarationLine>

            <Heritagexx list={node.heritageClauses}></Heritagexx>

            {'{'}
            <div className="pl-9">
                {node.members.map((item) =>
                    ts.isMethodSignature(item) ? (
                        <MethodSignature
                            node={item}
                            key={uk()}
                        ></MethodSignature>
                    ) : ts.isPropertySignature(item) ? (
                        <PropertySignature
                            node={item}
                            key={uk()}
                        ></PropertySignature>
                    ) : null,
                )}
                <MenuButton
                    visible={true}
                    factory={InterfaceMenuFactory(node)}
                ></MenuButton>
            </div>
            {'}'}
        </div>
    )
}

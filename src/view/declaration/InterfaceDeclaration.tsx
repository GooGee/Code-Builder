import React, { ReactElement } from 'react'
import ts from 'typescript'
import InterfaceMenuFactory from '../../helper/Menu/InterfaceMenuFactory'
import UniqueKey from '../../helper/UniqueKey'
import MenuButton from '../control/MenuButton'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
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
            <span>
                <Modifierxx list={node.modifiers}></Modifierxx>{' '}
                <Keyword kind={node.kind} suffix=" "></Keyword>
                <IdentifierDeclaration node={node.name}></IdentifierDeclaration>
                <TypeParameterDeclarationxx
                    list={node.typeParameters}
                ></TypeParameterDeclarationxx>
                <Heritagexx
                    list={node.heritageClauses}
                    parent={node}
                ></Heritagexx>
            </span>

            {'{'}
            <div className="pl-11">
                {node.members.map((item) =>
                    ts.isMethodSignature(item) ? (
                        <MethodSignature
                            key={uk()}
                            node={item}
                        ></MethodSignature>
                    ) : ts.isPropertySignature(item) ? (
                        <PropertySignature
                            key={uk()}
                            node={item}
                        ></PropertySignature>
                    ) : null,
                )}
                <MenuButton factory={InterfaceMenuFactory(node)}>
                    <span className="cursor-pointer px-2 py-1 mr-1">+</span>
                </MenuButton>
            </div>
            {'}'}
        </div>
    )
}

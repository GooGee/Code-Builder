import React, { ReactElement } from 'react'
import ts from 'typescript'
import ClassMenuFactory from '../../helper/Menu/ClassMenuFactory'
import UniqueKey from '../../helper/UniqueKey'
import MenuButton from '../control/MenuButton'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
import Keyword from '../text/Keyword'
import Modifierxx from '../text/Modifierxx'
import ConstructorDeclaration from './ConstructorDeclaration'
import MethodDeclaration from './MethodDeclaration'
import PropertyDeclaration from './PropertyDeclaration'
import TypeParameterDeclarationxx from './TypeParameterDeclarationxx'
import Heritagexx from './Heritagexx'

interface Props {
    node: ts.ClassDeclaration
}

export default function ClassDeclaration({ node }: Props): ReactElement {
    const uk = UniqueKey()
    return (
        <div>
            <span>
                <Modifierxx list={node.modifiers}></Modifierxx>{' '}
                <Keyword kind={node.kind} suffix=" "></Keyword>
                <IdentifierDeclaration
                    node={node.name!}
                ></IdentifierDeclaration>
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
                    ts.isConstructorDeclaration(item) ? (
                        <ConstructorDeclaration
                            key={uk()}
                            node={item}
                        ></ConstructorDeclaration>
                    ) : ts.isMethodDeclaration(item) ? (
                        <MethodDeclaration
                            key={uk()}
                            node={item}
                        ></MethodDeclaration>
                    ) : ts.isPropertyDeclaration(item) ? (
                        <PropertyDeclaration
                            key={uk()}
                            node={item}
                        ></PropertyDeclaration>
                    ) : null,
                )}
                <MenuButton factory={ClassMenuFactory(node)}>
                    <span className="cursor-pointer px-2 py-1 mr-1">+</span>
                </MenuButton>
            </div>
            {'}'}
        </div>
    )
}

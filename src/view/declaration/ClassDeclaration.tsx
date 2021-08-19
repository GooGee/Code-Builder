import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import ClassMenuFactory from '../../helper/Menu/ClassMenuFactory'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import UniqueKey from '../../helper/UniqueKey'
import HoverButton from '../control/HoverButton'
import MenuButton from '../control/MenuButton'
import MenuModal from '../control/MenuModal'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
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
    const [editing, setEditing] = useState(false)
    const uk = UniqueKey()
    return (
        <div>
            <Modifierxx list={node.modifiers}></Modifierxx>{' '}
            <MenuModal factory={StatementMenuFactory(node.parent as any, node)}>
                <Keyword kind={node.kind} suffix=" "></Keyword>
            </MenuModal>
            <span
                onMouseEnter={(event) => setEditing(true)}
                onMouseLeave={(event) => setEditing(false)}
            >
                <IdentifierDeclaration
                    node={node.name!}
                ></IdentifierDeclaration>{' '}
                <TypeParameterDeclarationxx
                    hovering={editing}
                    list={node.typeParameters}
                    parent={node}
                ></TypeParameterDeclarationxx>
                <Heritagexx
                    editing={editing}
                    list={node.heritageClauses}
                    parent={node}
                ></Heritagexx>
                {' {'}
            </span>
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
                            parent={node}
                        ></MethodDeclaration>
                    ) : ts.isPropertyDeclaration(item) ? (
                        <PropertyDeclaration
                            key={uk()}
                            node={item}
                            parent={node}
                        ></PropertyDeclaration>
                    ) : null,
                )}
                <MenuButton factory={ClassMenuFactory(node)}>
                    <HoverButton>+</HoverButton>
                </MenuButton>
            </div>
            {'}'}
        </div>
    )
}

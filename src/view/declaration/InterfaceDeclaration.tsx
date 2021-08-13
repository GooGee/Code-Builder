import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import InterfaceMenuFactory from '../../helper/Menu/InterfaceMenuFactory'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import UniqueKey from '../../helper/UniqueKey'
import HoverButton from '../control/HoverButton'
import MenuButton from '../control/MenuButton'
import MenuModal from '../control/MenuModal'
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
                <IdentifierDeclaration node={node.name}></IdentifierDeclaration>{' '}
                <TypeParameterDeclarationxx
                    list={node.typeParameters}
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
                    <HoverButton>+</HoverButton>
                </MenuButton>
            </div>
            {'}'}
        </div>
    )
}

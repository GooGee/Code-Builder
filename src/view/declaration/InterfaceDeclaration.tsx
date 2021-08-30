import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import InterfaceMenuFactory from '../../helper/Menu/InterfaceMenuFactory'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import HoverButton from '../control/HoverButton'
import MenuButton from '../control/MenuButton'
import StatementMenu from '../control/StatementMenu'
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
    return (
        <div>
            <Modifierxx list={node.modifiers}></Modifierxx>{' '}
            <StatementMenu
                factory={StatementMenuFactory}
                node={node}
                parent={node.parent as any}
            >
                <Keyword kind={node.kind} suffix=" "></Keyword>
            </StatementMenu>
            <span
                onMouseEnter={(event) => setEditing(true)}
                onMouseLeave={(event) => setEditing(false)}
            >
                <IdentifierDeclaration node={node.name}></IdentifierDeclaration>{' '}
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
                    ts.isMethodSignature(item) ? (
                        <MethodSignature
                            key={item.name.getText()}
                            node={item}
                            parent={node}
                        ></MethodSignature>
                    ) : ts.isPropertySignature(item) ? (
                        <PropertySignature
                            key={item.name.getText()}
                            node={item}
                            parent={node}
                        ></PropertySignature>
                    ) : null,
                )}
                <MenuButton factory={() => InterfaceMenuFactory(node)}>
                    <HoverButton>+</HoverButton>
                </MenuButton>
            </div>
            {'}'}
        </div>
    )
}

import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import MenuModal from '../control/MenuModal'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
import Equal from '../text/Equal'
import Keyword from '../text/Keyword'
import TypeRoot from '../type/TypeRoot'
import TypeParameterDeclarationxx from './TypeParameterDeclarationxx'

interface Props {
    node: ts.TypeAliasDeclaration
}

export default function TypeAliasDeclaration({ node }: Props): ReactElement {
    const [hovering, setHovering] = useState(false)
    return (
        <span>
            <MenuModal factory={StatementMenuFactory(node.parent as any, node)}>
                <Keyword kind={node.kind} suffix=" "></Keyword>
            </MenuModal>
            <span
                onMouseEnter={(event) => setHovering(true)}
                onMouseLeave={(event) => setHovering(false)}
            >
                <IdentifierDeclaration node={node.name}></IdentifierDeclaration>
                <TypeParameterDeclarationxx
                    hovering={hovering}
                    list={node.typeParameters}
                    parent={node}
                ></TypeParameterDeclarationxx>
            </span>
            <Equal></Equal>
            <TypeRoot node={node.type} parent={node}></TypeRoot>
        </span>
    )
}

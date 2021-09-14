import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import StatementMenu from '../control/StatementMenu'
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
            <StatementMenu
                factory={StatementMenuFactory}
                node={node}
                parent={node.parent as any}
            >
                <Keyword kind={node.kind} suffix=" "></Keyword>
            </StatementMenu>
            <span
                onMouseEnter={(event) => setHovering(true)}
                onMouseLeave={(event) => setHovering(false)}
            >
                <IdentifierDeclaration node={node.name}></IdentifierDeclaration>
                {/* <TypeParameterDeclarationxx
                    hovering={hovering}
                    list={node.typeParameters}
                    parent={node}
                ></TypeParameterDeclarationxx> */}
            </span>
            <Equal></Equal>
            <TypeRoot node={node.type} parent={node}></TypeRoot>
        </span>
    )
}

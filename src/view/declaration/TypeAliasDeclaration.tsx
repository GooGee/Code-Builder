import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import MenuModal from '../control/MenuModal'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
import Equal from '../text/Equal'
import Keyword from '../text/Keyword'
import TypeRoot from '../type/TypeRoot'

interface Props {
    node: ts.TypeAliasDeclaration
}

export default function TypeAliasDeclaration({ node }: Props): ReactElement {
    return (
        <span>
            <MenuModal factory={StatementMenuFactory(node.parent as any, node)}>
                <Keyword kind={node.kind} suffix=" "></Keyword>
            </MenuModal>
            <IdentifierDeclaration node={node.name}></IdentifierDeclaration>
            <Equal></Equal>
            <TypeRoot node={node.type} parent={node}></TypeRoot>
        </span>
    )
}

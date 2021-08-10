import React, { ReactElement } from 'react'
import ts from 'typescript'
import EnumMenuFactory from '../../helper/Menu/EnumMenuFactory'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import UniqueKey from '../../helper/UniqueKey'
import HoverButton from '../control/HoverButton'
import MenuButton from '../control/MenuButton'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
import Keyword from '../text/Keyword'
import Modifierxx from '../text/Modifierxx'
import EnumMember from './EnumMember'

interface Props {
    node: ts.EnumDeclaration
}

export default function EnumDeclaration({ node }: Props): ReactElement {
    const uk = UniqueKey()
    return (
        <div>
            <Modifierxx list={node.modifiers}></Modifierxx>{' '}
            <MenuButton
                factory={StatementMenuFactory(node.parent as any, node)}
            >
                <Keyword kind={node.kind} suffix=" "></Keyword>
            </MenuButton>
            <IdentifierDeclaration node={node.name}></IdentifierDeclaration>
            {' {'}
            <div className="pl-11">
                {node.members.map((member) => (
                    <EnumMember key={uk()} node={member}></EnumMember>
                ))}

                <MenuButton factory={EnumMenuFactory(node)}>
                    <HoverButton>+</HoverButton>
                </MenuButton>
            </div>
            {'}'}
        </div>
    )
}

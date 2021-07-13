import React, { ReactElement } from 'react'
import ts from 'typescript'
import EnumMenuFactory from '../../helper/Menu/EnumMenuFactory'
import UniqueKey from '../../helper/UniqueKey'
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
            <span>
                <Modifierxx list={node.modifiers}></Modifierxx>{' '}
                <Keyword kind={node.kind} suffix=" "></Keyword>
                <IdentifierDeclaration node={node.name}></IdentifierDeclaration>
            </span>

            {'{'}
            <div className="pl-11">
                {node.members.map((member) => (
                    <EnumMember key={uk()} node={member}></EnumMember>
                ))}

                <MenuButton
                    visible={true}
                    factory={EnumMenuFactory(node)}
                ></MenuButton>
            </div>
            {'}'}
        </div>
    )
}

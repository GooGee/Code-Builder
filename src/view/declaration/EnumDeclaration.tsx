import React, { ReactElement } from 'react'
import ts from 'typescript'
import EnumMenuFactory from '../../helper/Menu/EnumMenuFactory'
import UniqueKey from '../../helper/UniqueKey'
import MenuButton from '../control/MenuButton'
import StatementLine from '../control/StatementLine'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
import Keyword from '../text/Keyword'
import Modifierxx from '../text/Modifierxx'
import EnumMember from './EnumMember'

interface Props {
    editing: boolean
    node: ts.EnumDeclaration
}

export default function EnumDeclaration({
    editing,
    node,
}: Props): ReactElement {
    const uk = UniqueKey()
    return (
        <div>
            <div>
                <Modifierxx list={node.modifiers}></Modifierxx>{' '}
                <Keyword kind={node.kind}></Keyword>{' '}
                <IdentifierDeclaration
                    editing={editing}
                    node={node.name}
                ></IdentifierDeclaration>
            </div>

            {'{'}
            <div
                onClick={(event) => {
                    event.stopPropagation()
                }}
                className="pl-9"
            >
                {node.members.map((member) => (
                    <StatementLine
                        key={uk()}
                        menuFactory={EnumMenuFactory(
                            member.parent as any,
                            member,
                        )}
                        viewFactory={(editing) => (
                            <EnumMember
                                editing={editing}
                                node={member}
                            ></EnumMember>
                        )}
                    ></StatementLine>
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

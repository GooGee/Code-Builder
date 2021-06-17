import React, { ReactElement } from 'react'
import ts from 'typescript'
import EnumMenuFactory from '../../helper/Menu/EnumMenuFactory'
import SourceFileMenuFactory from '../../helper/Menu/SourceFileMenuFactory'
import UniqueKey from '../../helper/UniqueKey'
import MenuButton from '../control/MenuButton'
import StatementLine from '../control/StatementLine'
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
            <StatementLine
                menuFactory={SourceFileMenuFactory(node)}
                viewFactory={(editing) => (
                    <span>
                        <Modifierxx list={node.modifiers}></Modifierxx>{' '}
                        <Keyword kind={node.kind}></Keyword>{' '}
                        <IdentifierDeclaration
                            editing={editing}
                            node={node.name}
                        ></IdentifierDeclaration>
                    </span>
                )}
            ></StatementLine>

            {'{'}
            <div className="pl-11">
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

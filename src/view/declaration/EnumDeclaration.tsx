import React, { ReactElement } from 'react'
import ts from 'typescript'
import EnumMenuFactory from '../../helper/Menu/EnumMenuFactory'
import SourceFileMenuFactory from '../../helper/Menu/SourceFileMenuFactory'
import UniqueKey from '../../helper/UniqueKey'
import StatementLine from '../control/StatementLine'
import MenuButton from '../control/MenuButton'
import Identifier from '../expression/Identifier'
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
            <StatementLine factory={SourceFileMenuFactory(node)}>
                <Modifierxx list={node.modifiers}></Modifierxx>{' '}
                <Keyword kind={node.kind}></Keyword>{' '}
                <Identifier node={node.name}></Identifier>
            </StatementLine>

            {'{'}
            <div className="pl-9">
                {node.members.map((member) => {
                    return <EnumMember node={member} key={uk()}></EnumMember>
                })}
                <MenuButton
                    visible={true}
                    factory={EnumMenuFactory(node)}
                ></MenuButton>
            </div>
            {'}'}
        </div>
    )
}

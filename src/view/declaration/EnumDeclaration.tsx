import React, { ReactElement } from 'react'
import ts from 'typescript'
import EnumMenuFactory from '../../helper/Menu/EnumMenuFactory'
import SourceFileMenuFactory from '../../helper/Menu/SourceFileMenuFactory'
import UniqueKey from '../../helper/UniqueKey'
import LineButton from '../control/LineButton'
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
            <div>
                <LineButton factory={SourceFileMenuFactory(node)}></LineButton>
                <Modifierxx list={node.modifiers}></Modifierxx>{' '}
                <Keyword kind={node.kind}></Keyword>{' '}
                <Identifier node={node.name}></Identifier>
            </div>
            {'{'}
            <div className="pl-9">
                {node.members.map((member) => {
                    return <EnumMember node={member} key={uk()}></EnumMember>
                })}
                <LineButton factory={EnumMenuFactory(node)}></LineButton>
            </div>
            {'}'}
        </div>
    )
}

import React, { ReactElement } from 'react'
import ts from 'typescript'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
import Keyword from '../text/Keyword'
import Block from './Block'

interface Props {
    editing: boolean
    node: ts.CatchClause
}

export default function CatchClause({ editing, node }: Props): ReactElement {
    return (
        <div>
            <div>
                <Keyword kind={node.kind}></Keyword>{' '}
                <IdentifierDeclaration
                    editing={editing}
                    node={node.variableDeclaration!.name as any}
                ></IdentifierDeclaration>
            </div>
            <Block node={node.block}></Block>
        </div>
    )
}

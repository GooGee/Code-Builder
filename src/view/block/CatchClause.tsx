import React, { ReactElement } from 'react'
import ts from 'typescript'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
import Keyword from '../text/Keyword'
import Block from './Block'

interface Props {
    node: ts.CatchClause
}

export default function CatchClause({ node }: Props): ReactElement {
    return (
        <span>
            <Keyword kind={node.kind} prefix=" " suffix=" "></Keyword>
            <IdentifierDeclaration
                node={node.variableDeclaration!.name as any}
            ></IdentifierDeclaration>{' '}
            <Block node={node.block}></Block>
        </span>
    )
}

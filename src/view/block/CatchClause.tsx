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
        <div>
            <div>
                <Keyword kind={node.kind} suffix=" "></Keyword>
                <IdentifierDeclaration
                    editing={false}
                    node={node.variableDeclaration!.name as any}
                ></IdentifierDeclaration>
            </div>
            <Block node={node.block}></Block>
        </div>
    )
}

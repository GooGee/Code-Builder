import React, { ReactElement } from 'react'
import ts from 'typescript'
import VariableDeclaration from '../declaration/VariableDeclaration'
import Keyword from '../text/Keyword'
import Block from './Block'

interface Props {
    node: ts.CatchClause
}

export default function CatchClause({ node }: Props): ReactElement {
    return (
        <div>
            <div>
                <Keyword kind={node.kind}></Keyword>{' '}
                <VariableDeclaration
                    node={node.variableDeclaration!}
                ></VariableDeclaration>
            </div>
            <Block node={node.block}></Block>
        </div>
    )
}

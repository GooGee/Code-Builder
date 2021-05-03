import React, { ReactElement } from 'react'
import ts from 'typescript'
import Identifier from '../expression/Identifier'
import Equal from '../text/Equal'
import Keyword from '../text/Keyword'
import TypeNode from '../type/TypeNode'

interface Props {
    node: ts.TypeAliasDeclaration
}

export default function TypeAliasDeclaration({ node }: Props): ReactElement {
    return (
        <span>
            <Keyword kind={node.kind}></Keyword>{' '}
            <Identifier node={node.name}></Identifier>
            <Equal></Equal>
            <TypeNode node={node.type}></TypeNode>
        </span>
    )
}

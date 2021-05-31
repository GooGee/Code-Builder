import React, { ReactElement } from 'react'
import ts from 'typescript'
import Identifier from '../expression/Identifier'
import Equal from '../text/Equal'
import Keyword from '../text/Keyword'
import TypeRoot from '../type/TypeRoot'

interface Props {
    editing: boolean
    node: ts.TypeAliasDeclaration
}

export default function TypeAliasDeclaration({
    editing,
    node,
}: Props): ReactElement {
    return (
        <span>
            <Keyword kind={node.kind}></Keyword>{' '}
            <Identifier editing={editing} node={node.name}></Identifier>
            <Equal></Equal>
            <TypeRoot
                editing={editing}
                node={node.type}
                parent={node}
            ></TypeRoot>
        </span>
    )
}

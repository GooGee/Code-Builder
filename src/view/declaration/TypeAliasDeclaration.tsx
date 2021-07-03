import React, { ReactElement } from 'react'
import ts from 'typescript'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
import Equal from '../text/Equal'
import Keyword from '../text/Keyword'
import TypeRoot from '../type/TypeRoot'

interface Props {
    node: ts.TypeAliasDeclaration
}

export default function TypeAliasDeclaration({ node }: Props): ReactElement {
    const editing = false
    return (
        <span>
            <Keyword kind={node.kind}></Keyword>{' '}
            <IdentifierDeclaration
                editing={editing}
                node={node.name}
            ></IdentifierDeclaration>
            <Equal></Equal>
            <TypeRoot
                editing={editing}
                node={node.type}
                parent={node}
            ></TypeRoot>
        </span>
    )
}

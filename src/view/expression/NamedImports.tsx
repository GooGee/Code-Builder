import React, { ReactElement } from 'react'
import ts from 'typescript'
import ImportSpecifier from './ImportSpecifier'

interface Props {
    node: ts.NamedImports
}

export default function NamedImports({ node }: Props): ReactElement {
    return (
        <span>
            {'{'}
            {node.elements.map((item) => {
                return (
                    <ImportSpecifier
                        node={item}
                        key={item.name.text}
                    ></ImportSpecifier>
                )
            })}
            {'}'}
        </span>
    )
}

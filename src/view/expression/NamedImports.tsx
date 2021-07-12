import React, { ReactElement } from 'react'
import ts from 'typescript'
import UniqueKey from '../../helper/UniqueKey'
import ImportSpecifier from './ImportSpecifier'

interface Props {
    node: ts.NamedImports
}

export default function NamedImports({ node }: Props): ReactElement {
    const uk = UniqueKey()
    return (
        <span>
            {'{'}
            {/* {node.elements.map((item) => {
                return (
                    <ImportSpecifier
                        editing={editing}
                        node={item}
                        key={uk()}
                    ></ImportSpecifier>
                )
            })} */}
            {'}'}
        </span>
    )
}

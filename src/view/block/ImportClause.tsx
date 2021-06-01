import React, { ReactElement } from 'react'
import ts from 'typescript'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
import NamedImports from '../expression/NamedImports'
import NamespaceImport from '../expression/NamespaceImport'

interface Props {
    editing: boolean
    node: ts.ImportClause | undefined
}

export default function ImportClause({
    editing,
    node,
}: Props): ReactElement | null {
    if (node === undefined) {
        return null
    }

    const nnn = node

    function getBinding() {
        if (nnn.namedBindings === undefined) {
            return null
        }

        if (ts.isNamedImports(nnn.namedBindings)) {
            return (
                <NamedImports
                    editing={editing}
                    node={nnn.namedBindings}
                ></NamedImports>
            )
        }
        if (ts.isNamespaceImport(nnn.namedBindings)) {
            return (
                <NamespaceImport
                    editing={editing}
                    node={nnn.namedBindings}
                ></NamespaceImport>
            )
        }

        return new Error('Unknown ImportClause')
    }

    return (
        <span>
            {nnn.name === undefined ? null : (
                <IdentifierDeclaration
                    editing={editing}
                    node={nnn.name}
                ></IdentifierDeclaration>
            )}
            {getBinding()}
        </span>
    )
}

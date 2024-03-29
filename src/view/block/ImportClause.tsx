import React, { ReactElement } from 'react'
import ts from 'typescript'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
import NamedImports from '../expression/NamedImports'
import NamespaceImport from '../expression/NamespaceImport'

interface Props {
    node: ts.ImportClause | undefined
}

export default function ImportClause({ node }: Props): ReactElement | null {
    if (node === undefined) {
        return null
    }

    const nnn = node

    function getBinding() {
        if (nnn.namedBindings === undefined) {
            return null
        }

        if (ts.isNamedImports(nnn.namedBindings)) {
            return <NamedImports node={nnn.namedBindings}></NamedImports>
        }
        if (ts.isNamespaceImport(nnn.namedBindings)) {
            return <NamespaceImport node={nnn.namedBindings}></NamespaceImport>
        }

        return new Error('Unknown ImportClause')
    }

    return (
        <span>
            {nnn.name === undefined ? null : (
                <IdentifierDeclaration node={nnn.name}></IdentifierDeclaration>
            )}
            {getBinding()}
        </span>
    )
}

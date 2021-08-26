import React, { ReactElement, useContext } from 'react'
import ts from 'typescript'
import refactor from '../../helper/refactor'
import SourceFileContext from '../context/SourceFileContext'
import Identifier from '../text/Identifier'

interface Props {
    node: ts.Identifier
}

export default function IdentifierDeclaration({ node }: Props): ReactElement {
    const context = useContext(SourceFileContext)
    return (
        <span
            onClick={() => {
                const value = prompt('Enter a name', node.text)
                if (value === null) {
                    return
                }
                try {
                    refactor(node, value)
                    context.update()
                } catch (error) {
                    alert(error.message)
                }
            }}
        >
            <Identifier node={node}></Identifier>
        </span>
    )
}

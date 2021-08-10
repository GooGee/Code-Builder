import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import ExpressionRoot from '../expression/ExpressionRoot'
import ExpressionRootEdit from '../expression/ExpressionRootEdit'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
import Colon from '../text/Colon'
import Equal from '../text/Equal'
import Token from '../text/Token'
import TypeRoot from '../type/TypeRoot'

interface Props {
    node:
        | ts.ParameterDeclaration
        | ts.PropertyDeclaration
        | ts.PropertySignature
        | ts.VariableDeclaration
}

export default function NameTypeValue({ node }: Props): ReactElement {
    const [editing, setEditing] = useState(false)

    function getToken(nnn: ts.ParameterPropertyDeclaration) {
        if (nnn.questionToken) {
            return <Token kind={nnn.questionToken.kind}></Token>
        }
        return null
    }

    return (
        <span
            onMouseEnter={(event) => setEditing(true)}
            onMouseLeave={(event) => setEditing(false)}
        >
            <IdentifierDeclaration
                node={node.name as any}
            ></IdentifierDeclaration>
            {getToken(node as any)}
            {node.type === undefined ? null : (
                <>
                    <Colon></Colon>{' '}
                </>
            )}
            <TypeRoot
                editing={editing}
                node={node.type}
                parent={node}
            ></TypeRoot>
            {node.initializer ? <Equal /> : null}
            {editing ? (
                <ExpressionRootEdit
                    node={node.initializer}
                    parent={node}
                    propertyName="initializer"
                ></ExpressionRootEdit>
            ) : (
                <ExpressionRoot
                    node={node.initializer}
                    parent={node}
                    propertyName="initializer"
                ></ExpressionRoot>
            )}
        </span>
    )
}

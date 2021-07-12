import React, { ReactElement } from 'react'
import ts from 'typescript'
import ExpressionRoot from '../expression/ExpressionRoot'
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

export default function NameValue({ node }: Props): ReactElement {
    function getToken(nnn: ts.ParameterPropertyDeclaration) {
        if (nnn.questionToken) {
            return <Token kind={nnn.questionToken.kind}></Token>
        }
        return null
    }

    const editing = false
    return (
        <span>
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
            <ExpressionRoot
                node={node.initializer}
                parent={node}
                propertyName="initializer"
            ></ExpressionRoot>
        </span>
    )
}

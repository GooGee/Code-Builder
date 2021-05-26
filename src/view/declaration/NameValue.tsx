import React, { ReactElement } from 'react'
import ts from 'typescript'
import ExpressionRoot from '../expression/ExpressionRoot'
import Identifier from '../expression/Identifier'
import Colon from '../text/Colon'
import Equal from '../text/Equal'
import Token from '../text/Token'
import TypeNode from '../type/TypeNode'

interface Props {
    editing: boolean
    node:
        | ts.ParameterDeclaration
        | ts.PropertyDeclaration
        | ts.PropertySignature
        | ts.VariableDeclaration
}

export default function NameValue({ editing, node }: Props): ReactElement {
    function getToken(nnn: ts.ParameterPropertyDeclaration) {
        if (nnn.questionToken) {
            return <Token kind={nnn.questionToken.kind}></Token>
        }
        return null
    }

    return (
        <span>
            <Identifier node={node.name as any}></Identifier>
            {getToken(node as any)}
            {node.type === undefined ? null : (
                <>
                    <Colon></Colon> <TypeNode node={node.type}></TypeNode>
                </>
            )}
            {node.initializer ? <Equal /> : null}
            <ExpressionRoot
                editing={editing}
                node={node.initializer}
                parent={node}
                propertyName="initializer"
            ></ExpressionRoot>
        </span>
    )
}

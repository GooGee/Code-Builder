import React, { ReactElement } from 'react'
import ts from 'typescript'
import ExpressionRoot from '../expression/ExpressionRoot'
import Identifier from '../expression/Identifier'
import Colon from '../text/Colon'
import Equal from '../text/Equal'
import Token from '../text/Token'
import TypeNode from '../type/TypeNode'

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

    function getType() {
        if (node.type) {
            return (
                <>
                    <Colon></Colon> <TypeNode node={node.type}></TypeNode>
                </>
            )
        }
        return null
    }

    return (
        <span>
            <Identifier node={node.name as any}></Identifier>
            {getToken(node as any)}
            {getType()}
            {node.initializer ? <Equal></Equal> : null}
            <ExpressionRoot node={node.initializer}></ExpressionRoot>
        </span>
    )
}

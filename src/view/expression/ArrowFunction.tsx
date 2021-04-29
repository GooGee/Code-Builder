import React, { ReactElement } from 'react'
import ts from 'typescript'
import Block from '../block/Block'
import Token from '../text/Token'
import ParameterDeclarationxx from '../declaration/ParameterDeclarationxx'
import ExpressionRoot from './ExpressionRoot'

interface Props {
    node: ts.ArrowFunction
}

export default function ArrowFunction({ node }: Props): ReactElement {
    function getBody() {
        if (ts.isBlock(node.body)) {
            return (
                <div className="block-padding">
                    <Block node={node.body}></Block>
                </div>
            )
        }
        return <ExpressionRoot node={node.body}></ExpressionRoot>
    }

    return (
        <span>
            <ParameterDeclarationxx
                list={node.parameters}
            ></ParameterDeclarationxx>{' '}
            <Token kind={node.equalsGreaterThanToken.kind}></Token> {getBody()}
        </span>
    )
}

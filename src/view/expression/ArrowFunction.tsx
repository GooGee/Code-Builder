import React, { ReactElement } from 'react'
import ts from 'typescript'
import Block from '../block/Block'
import ParameterDeclarationxx from '../declaration/ParameterDeclarationxx'
import Token from '../text/Token'
import ExpressionRoot from './ExpressionRoot'

interface Props {
    node: ts.ArrowFunction
}

export default function ArrowFunction({ node }: Props): ReactElement {
    if (ts.isBlock(node.body)) {
        return (
            <div className="pl-11">
                <ParameterDeclarationxx
                    list={node.parameters}
                    parent={node}
                ></ParameterDeclarationxx>{' '}
                <Token
                    kind={node.equalsGreaterThanToken.kind}
                    suffix=" "
                ></Token>
                <Block node={node.body}></Block>
            </div>
        )
    }

    return (
        <span>
            <ParameterDeclarationxx
                list={node.parameters}
                parent={node}
            ></ParameterDeclarationxx>{' '}
            <Token kind={node.equalsGreaterThanToken.kind} suffix=" "></Token>
            <ExpressionRoot
                node={node.body}
                parent={node}
                propertyName="body"
            ></ExpressionRoot>
        </span>
    )
}

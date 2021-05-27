import React, { ReactElement } from 'react'
import ts from 'typescript'
import Block from '../block/Block'
import ParameterDeclarationxx from '../declaration/ParameterDeclarationxx'
import Token from '../text/Token'
import ExpressionRoot from './ExpressionRoot'

interface Props {
    editing: boolean
    node: ts.ArrowFunction
}

export default function ArrowFunction({ editing, node }: Props): ReactElement {
    if (ts.isBlock(node.body)) {
        return (
            <div className="pl-9">
                <ParameterDeclarationxx
                    editing={editing}
                    list={node.parameters}
                ></ParameterDeclarationxx>{' '}
                <Token kind={node.equalsGreaterThanToken.kind}></Token>{' '}
                <Block node={node.body}></Block>
            </div>
        )
    }

    return (
        <span>
            <ParameterDeclarationxx
                editing={editing}
                list={node.parameters}
            ></ParameterDeclarationxx>{' '}
            <Token kind={node.equalsGreaterThanToken.kind}></Token>{' '}
            <ExpressionRoot
                editing={editing}
                node={node.body}
                parent={node}
                propertyName="body"
            ></ExpressionRoot>
        </span>
    )
}

import React, { ReactElement } from 'react'
import ts from 'typescript'
import Token from '../text/Token'
import ExpressionRoot from './ExpressionRoot'

interface Props {
    editing: boolean
    node: ts.BinaryExpression
}

export default function Assign({ editing, node }: Props): ReactElement {
    return (
        <span>
            <ExpressionRoot
                editing={editing}
                node={node.left}
                isLeft={true}
                parent={node}
            ></ExpressionRoot>{' '}
            <Token kind={node.operatorToken.kind}></Token>{' '}
            <ExpressionRoot
                editing={editing}
                node={node.right}
                parent={node}
            ></ExpressionRoot>
        </span>
    )
}

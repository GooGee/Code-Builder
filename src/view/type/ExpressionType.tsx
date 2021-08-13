import React, { ReactElement } from 'react'
import ts from 'typescript'
import TypeArgumentxx from './TypeArgumentxx'

interface Props {
    node: ts.ExpressionWithTypeArguments
}

export default function ExpressionType({ node }: Props): ReactElement {
    return (
        <span>
            <span className="cursor-pointer">{node.expression.getText()}</span>
            <TypeArgumentxx
                list={node.typeArguments}
                parent={node}
            ></TypeArgumentxx>
        </span>
    )
}

import React, { ReactElement } from 'react'
import ts from 'typescript'
import Assign from '../expression/Assign'
import ExpressionRoot from '../expression/ExpressionRoot'

interface Props {
    node: ts.ExpressionStatement
}

export default function ExpressionStatement({ node }: Props): ReactElement {
    if (ts.isBinaryExpression(node.expression)) {
        return <Assign node={node.expression}></Assign>
    }
    return (
        <ExpressionRoot
            isLeft={true}
            node={node.expression}
            parent={node}
        ></ExpressionRoot>
    )
}

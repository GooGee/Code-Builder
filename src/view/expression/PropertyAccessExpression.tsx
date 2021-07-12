import React, { ReactElement } from 'react'
import ts from 'typescript'
import Dot from '../text/Dot'
import Expression from './Expression'
import IdentifierExpression from './IdentifierExpression'

interface Props {
    node: ts.PropertyAccessExpression
}

export default function PropertyAccessExpression({
    node,
}: Props): ReactElement {
    return (
        <span>
            <Expression node={node.expression}></Expression>
            <Dot></Dot>
            <IdentifierExpression
                node={node.name as any}
            ></IdentifierExpression>
        </span>
    )
}

import React, { ReactElement } from 'react'
import ts from 'typescript'
import Keyword from '../text/Keyword'
import CallExpression from './CallExpression'

interface Props {
    node: ts.NewExpression
    root: ts.Expression
}

export default function NewExpression({ node, root }: Props): ReactElement {
    return (
        <>
            <Keyword kind={node.kind} suffix=" "></Keyword>
            <CallExpression node={node} root={root}></CallExpression>
        </>
    )
}

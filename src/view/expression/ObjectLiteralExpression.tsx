import React, { ReactElement } from 'react'
import ts from 'typescript'

interface Props {
    node: ts.ObjectLiteralExpression
}

export default function ObjectLiteralExpression({ node }: Props): ReactElement {
    return <span>{node.getText()}</span>
}

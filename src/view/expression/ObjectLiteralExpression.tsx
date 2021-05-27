import React, { ReactElement } from 'react'
import ts from 'typescript'

interface Props {
    editing: boolean
    node: ts.ObjectLiteralExpression
}

export default function ObjectLiteralExpression({
    editing,
    node,
}: Props): ReactElement {
    return <span>{node.getText()}</span>
}

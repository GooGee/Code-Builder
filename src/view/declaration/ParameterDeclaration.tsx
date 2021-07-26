import React, { ReactElement } from 'react'
import ts from 'typescript'

interface Props {
    node: ts.ParameterDeclaration
}

export default function ParameterDeclaration({ node }: Props): ReactElement {
    return <span className="cursor-pointer">{node.getText()}</span>
}

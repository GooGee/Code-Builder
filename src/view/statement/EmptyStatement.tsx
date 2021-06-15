import React, { ReactElement } from 'react'
import ts from 'typescript'

interface Props {
    node: ts.EmptyStatement
}

export default function EmptyStatement({ node }: Props): ReactElement {
    return <span></span>
}

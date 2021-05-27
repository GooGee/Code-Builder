import React, { ReactElement } from 'react'
import ts from 'typescript'
import Keyword from '../text/Keyword'
import CallExpression from './CallExpression'

interface Props {
    editing: boolean
    node: ts.NewExpression
}

export default function NewExpression({ editing, node }: Props): ReactElement {
    return (
        <>
            <Keyword kind={node.kind}></Keyword>{' '}
            <CallExpression editing={editing} node={node}></CallExpression>
        </>
    )
}

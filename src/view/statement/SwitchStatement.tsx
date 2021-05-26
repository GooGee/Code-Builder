import React, { ReactElement } from 'react'
import ts from 'typescript'
import CaseBlock from '../block/CaseBlock'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    editing: boolean
    node: ts.SwitchStatement
}

export default function SwitchStatement({
    editing,
    node,
}: Props): ReactElement {
    return (
        <div>
            <Keyword kind={node.kind}></Keyword>{' '}
            <ExpressionRoot
                editing={editing}
                node={node.expression}
                parent={node}
            ></ExpressionRoot>
            <CaseBlock node={node.caseBlock}></CaseBlock>
        </div>
    )
}

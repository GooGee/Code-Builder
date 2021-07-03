import React, { ReactElement } from 'react'
import ts from 'typescript'
import CaseBlock from '../block/CaseBlock'
import ExpressionRoot from '../expression/ExpressionRoot'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.SwitchStatement
}

export default function SwitchStatement({ node }: Props): ReactElement {
    return (
        <span>
            <Keyword kind={node.kind}></Keyword>{' '}
            <ExpressionRoot
                node={node.expression}
                parent={node}
            ></ExpressionRoot>
            <CaseBlock node={node.caseBlock}></CaseBlock>
        </span>
    )
}

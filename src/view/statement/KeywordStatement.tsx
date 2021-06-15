import React, { ReactElement } from 'react'
import ts from 'typescript'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.BreakStatement | ts.ContinueStatement
}

export default function KeywordStatement({ node }: Props): ReactElement {
    return <Keyword kind={node.kind}></Keyword>
}

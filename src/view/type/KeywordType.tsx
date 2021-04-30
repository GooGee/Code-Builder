import React, { ReactElement } from 'react'
import ts from 'typescript'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.KeywordTypeNode
}

export default function KeywordType({ node }: Props): ReactElement {
    return <Keyword kind={node.kind}></Keyword>
}

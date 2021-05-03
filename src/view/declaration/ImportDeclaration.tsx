import React, { ReactElement } from 'react'
import ts from 'typescript'
import ImportClause from '../block/ImportClause'
import Literal from '../expression/Literal'
import Keyword from '../text/Keyword'
import Modifierxx from '../text/Modifierxx'

interface Props {
    node: ts.ImportDeclaration
}

export default function ImportDeclaration({ node }: Props): ReactElement {
    return (
        <div>
            <Modifierxx list={node.modifiers}></Modifierxx>
            <Keyword kind={node.kind}></Keyword>
            <ImportClause node={node.importClause}></ImportClause>
            <span className="keyword">from</span>
            <Literal node={node.moduleSpecifier as any}></Literal>
        </div>
    )
}

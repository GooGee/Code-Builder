import React, { ReactElement } from 'react'
import ts from 'typescript'
import ImportClause from '../block/ImportClause'
import LiteralExpression from '../expression/LiteralExpression'
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
            <LiteralExpression node={node.moduleSpecifier as any}></LiteralExpression>
        </div>
    )
}

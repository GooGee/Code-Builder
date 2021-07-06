import React, { ReactElement } from 'react'
import ts from 'typescript'
import CaseMenuFactory from '../../helper/Menu/CaseMenuFactory'
import MenuButton from '../control/MenuButton'
import ExpressionRoot from '../expression/ExpressionRoot'
import Statementxx from '../statement/Statementxx'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.CaseClause
}

export default function CaseClause({ node }: Props): ReactElement {
    return (
        <span>
            <MenuButton
                factory={CaseMenuFactory(node.parent, node)}
            >
                <Keyword kind={node.kind}></Keyword>
            </MenuButton>
            <ExpressionRoot
                node={node.expression}
                parent={node}
            ></ExpressionRoot>
            <div className="pl-11">
                <Statementxx list={node.statements}></Statementxx>
            </div>
        </span>
    )
}

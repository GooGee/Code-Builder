import React, { ReactElement } from 'react'
import ts from 'typescript'
import CaseMenuFactory from '../../helper/Menu/CaseMenuFactory'
import MenuButton from '../control/MenuButton'
import Statementxx from '../statement/Statementxx'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.DefaultClause
}

export default function DefaultClause({ node }: Props): ReactElement {
    return (
        <span>
            <MenuButton factory={() => CaseMenuFactory(node.parent, node as any)}>
                <Keyword kind={node.kind}></Keyword>
            </MenuButton>
            <div className="pl-11">
                <Statementxx list={node.statements}></Statementxx>
            </div>
        </span>
    )
}

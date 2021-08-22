import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import Block from '../block/Block'
import StatementMenu from '../control/StatementMenu'
import VariableDeclarationList from '../declaration/VariableDeclarationList'
import Assign from '../expression/Assign'
import BinaryExpression from '../expression/BinaryExpression'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.ForStatement
}

export default function ForStatement({ node }: Props): ReactElement {
    const [editing, setEditing] = useState(false)
    return (
        <span>
            <span>
            <StatementMenu
                factory={StatementMenuFactory}
                node={node}
                parent={node.parent as any}
            >
                <Keyword kind={node.kind} suffix=" "></Keyword>
            </StatementMenu>
                <VariableDeclarationList
                    node={node.initializer as any}
                ></VariableDeclarationList>
            </span>
            <br />
            <span
                onMouseEnter={(event) => setEditing(true)}
                onMouseLeave={(event) => setEditing(false)}
                className="pl-11"
            >
                <BinaryExpression
                    editing={editing}
                    node={node.condition as any}
                ></BinaryExpression>
            </span>
            <br />
            <span className="pl-11">
                <Assign node={node.incrementor as any}></Assign>
            </span>{' '}
            <Block node={node.statement as any}></Block>
        </span>
    )
}

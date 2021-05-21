import React, { ReactElement } from 'react'
import ts from 'typescript'
import EnumMenuFactory from '../../helper/Menu/EnumMenuFactory'
import StatementLine from '../control/StatementLine'
import ExpressionRoot from '../expression/ExpressionRoot'
import Identifier from '../expression/Identifier'

interface Props {
    node: ts.EnumMember
}

export default function EnumMember({ node }: Props): ReactElement {
    return (
        <StatementLine factory={EnumMenuFactory(node.parent as any, node)}>
            <Identifier node={node.name as any}></Identifier>
            {node.initializer ? ' = ' : ''}
            <ExpressionRoot node={node.initializer}></ExpressionRoot>
        </StatementLine>
    )
}

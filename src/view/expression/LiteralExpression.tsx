import React, { ReactElement } from 'react'
import ts from 'typescript'
import { ObjectChildMenuFactory } from '../../helper/Menu/ExpressionMenuFactory'
import MenuButton from '../control/MenuButton'
import Literal from '../text/Literal'

interface Props {
    node: ts.NumericLiteral | ts.StringLiteral
}

export default function LiteralExpression({ node }: Props): ReactElement {
    return (
        <MenuButton factory={ObjectChildMenuFactory(node)}>
            <Literal node={node}></Literal>
        </MenuButton>
    )
}

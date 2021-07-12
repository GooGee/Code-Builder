import React, { ReactElement } from 'react'
import ts from 'typescript'
import { ObjectChildMenuFactory } from '../../helper/Menu/ExpressionMenuFactory'
import MenuButton from '../control/MenuButton'

interface Props {
    node: ts.NumericLiteral | ts.StringLiteral
}

export default function Literal({ node }: Props): ReactElement {
    const text = ts.isStringLiteral(node) ? `"${node.text}"` : node.text
    return (
        <MenuButton factory={ObjectChildMenuFactory(node)} visible={true}>
            <span className="literal">{text}</span>
        </MenuButton>
    )
}

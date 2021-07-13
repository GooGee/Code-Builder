import React, { ReactElement } from 'react'
import ts from 'typescript'
import { ObjectChildMenuFactory } from '../../helper/Menu/ExpressionMenuFactory'
import MenuButton from '../control/MenuButton'
import Identifier from '../text/Identifier'

interface Props {
    node: ts.Identifier
}

export default function IdentifierExpression({ node }: Props): ReactElement {
    return (
        <MenuButton factory={ObjectChildMenuFactory(node)} visible={true}>
            <Identifier node={node}></Identifier>
        </MenuButton>
    )
}

import React, { ReactElement } from 'react'
import ts from 'typescript'
import { ObjectChildMenuFactory } from '../../helper/Menu/ExpressionMenuFactory'
import MenuButton from '../control/MenuButton'
import Identifier from './Identifier'

interface Props {
    editing: boolean
    node: ts.Identifier | ts.PrivateIdentifier
}

export default function IdentifierExpression({
    editing,
    node,
}: Props): ReactElement {
    if (editing) {
        return (
            <MenuButton
                factory={ObjectChildMenuFactory(node)}
                text={node.text}
                visible={true}
            ></MenuButton>
        )
    }

    return <Identifier node={node}></Identifier>
}

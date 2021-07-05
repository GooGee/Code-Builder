import React, { ReactElement } from 'react'
import ts from 'typescript'
import { AssignTokenMenuFactory } from '../../helper/Menu/TokenMenuFactory'
import MenuButton from '../control/MenuButton'
import Token from './Token'

interface Props {
    editing: boolean
    token: ts.BinaryOperatorToken
}

export default function AssignToken({ editing, token }: Props): ReactElement {
    if (editing) {
        return (
            <MenuButton
                factory={AssignTokenMenuFactory(token)}
                text={ts.tokenToString(token.kind)}
                visible={true}
            ></MenuButton>
        )
    }

    return <Token kind={token.kind}></Token>
}

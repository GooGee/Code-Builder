import React, { ReactElement } from 'react'
import ts from 'typescript'
import { AssignTokenMenuFactory } from '../../helper/Menu/TokenMenuFactory'
import HoverButton from '../control/HoverButton'
import MenuButton from '../control/MenuButton'
import Token from './Token'

interface Props {
    token: ts.BinaryOperatorToken
}

export default function AssignToken({ token }: Props): ReactElement {
    return (
        <MenuButton factory={AssignTokenMenuFactory(token)}>
            <HoverButton>
                <Token kind={token.kind}></Token>
            </HoverButton>
        </MenuButton>
    )
}

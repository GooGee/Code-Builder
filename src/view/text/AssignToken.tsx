import React, { ReactElement } from 'react'
import ts from 'typescript'
import { AssignTokenMenuFactory } from '../../helper/Menu/TokenMenuFactory'
import HoverButton from '../control/HoverButton'
import TokenMenu from '../control/TokenMenu'
import Token from './Token'

interface Props {
    token: ts.BinaryOperatorToken
}

export default function AssignToken({ token }: Props): ReactElement {
    return (
        <TokenMenu factory={AssignTokenMenuFactory} token={token}>
            <HoverButton color="">
                <Token kind={token.kind}></Token>
            </HoverButton>
        </TokenMenu>
    )
}

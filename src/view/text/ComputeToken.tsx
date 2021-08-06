import React, { ReactElement } from 'react'
import ts from 'typescript'
import { ComputeTokenMenuFactory } from '../../helper/Menu/TokenMenuFactory'
import HoverBold from '../control/HoverBold'
import MenuButton from '../control/MenuButton'
import Token from './Token'

interface Props {
    token: ts.BinaryOperatorToken
}

export default function ComputeToken({ token }: Props): ReactElement {
    return (
        <MenuButton factory={ComputeTokenMenuFactory(token)}>
            <HoverBold>
                <Token kind={token.kind}></Token>
            </HoverBold>
        </MenuButton>
    )
}

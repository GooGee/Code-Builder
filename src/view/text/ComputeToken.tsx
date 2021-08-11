import React, { ReactElement } from 'react'
import ts from 'typescript'
import { ComputeTokenMenuFactory } from '../../helper/Menu/TokenMenuFactory'
import HoverButton from '../control/HoverButton'
import MenuModal from '../control/MenuModal'
import Token from './Token'

interface Props {
    token: ts.BinaryOperatorToken
}

export default function ComputeToken({ token }: Props): ReactElement {
    return (
        <MenuModal factory={ComputeTokenMenuFactory(token)}>
            <HoverButton>
                <Token kind={token.kind}></Token>
            </HoverButton>
        </MenuModal>
    )
}

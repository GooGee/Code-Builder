import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import Menu from '../../model/Menu'
import Button from './Button'
import Menuxx from './Menuxx'
import ModalDialog from './ModalDialog'

interface Factory {
    (token: ts.BinaryOperatorToken): Menu
}

interface Props {
    children?: ReactElement
    factory: Factory
    text?: string
    token: ts.BinaryOperatorToken
}

export default function TokenMenu({
    children,
    factory,
    text = '*',
    token,
}: Props): ReactElement {
    const [list, setList] = useState<Menu[]>([])
    return (
        <ModalDialog
            onOpen={() => setList(factory(token).list)}
            trigger={children ? children : <Button>{text}</Button>}
        >
            <Menuxx list={list}></Menuxx>
        </ModalDialog>
    )
}

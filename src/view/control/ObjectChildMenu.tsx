import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import { ObjectType } from '../../helper/Menu/ObjectChildMenuFactory'
import Menu from '../../model/Menu'
import Button from './Button'
import Menuxx from './Menuxx'
import ModalDialog from './ModalDialog'

interface Factory {
    (node: ObjectType): Menu
}

interface Props {
    children?: ReactElement
    factory: Factory
    node: ObjectType
    text?: string
}

export default function ObjectChildMenu({
    children,
    factory,
    node,
    text = '*',
}: Props): ReactElement {
    const [list, setList] = useState<Menu[]>([])
    return (
        <ModalDialog
            onOpen={() => setList(factory(node).list)}
            trigger={children ? children : <Button>{text}</Button>}
        >
            <Menuxx list={list}></Menuxx>
        </ModalDialog>
    )
}

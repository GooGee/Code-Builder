import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import { ObjectType } from '../../helper/Menu/ObjectChildMenuFactory'
import Menu from '../../model/Menu'
import Button from './Button'
import Menuxx from './Menuxx'
import ModalDialog from './ModalDialog'

interface Factory {
    (node: ObjectType, root: ts.Expression): Menu
}

interface Props {
    children?: ReactElement
    factory: Factory
    node: ObjectType
    root: ts.Expression
    text?: string
}

export default function ObjectChildMenu({
    children,
    factory,
    node,
    root,
    text = '*',
}: Props): ReactElement {
    const [list, setList] = useState<Menu[]>([])
    return (
        <ModalDialog
            onOpen={() => setList(factory(node, root).list)}
            trigger={children ? children : <Button>{text}</Button>}
        >
            <Menuxx list={list}></Menuxx>
        </ModalDialog>
    )
}

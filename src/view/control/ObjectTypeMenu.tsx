import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import Menu from '../../model/Menu'
import Button from './Button'
import Menuxx from './Menuxx'
import ModalDialog from './ModalDialog'

interface Factory {
    (parent: ts.Node, node?: ts.TypeNode | ts.Identifier): Menu
}

interface Props {
    children?: ReactElement
    factory: Factory
    node?: ts.TypeNode | ts.Identifier
    parent: ts.Node
    text?: string
}

export default function ObjectTypeMenu({
    children,
    factory,
    node,
    parent,
    text = '*',
}: Props): ReactElement {
    const [list, setList] = useState<Menu[]>([])
    return (
        <ModalDialog
            onOpen={() => setList(factory(parent, node).list)}
            trigger={children ? children : <Button>{text}</Button>}
        >
            <Menuxx list={list}></Menuxx>
        </ModalDialog>
    )
}

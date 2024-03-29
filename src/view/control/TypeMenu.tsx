import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import Menu from '../../model/Menu'
import Button from './Button'
import Menuxx from './Menuxx'
import ModalDialog from './ModalDialog'

interface Factory {
    (
        parent: ts.Node,
        node?: ts.TypeNode,
        required?: boolean,
        onlyObjectType?: boolean,
    ): Menu
}

interface Props {
    children?: ReactElement
    factory: Factory
    node?: ts.TypeNode
    parent: ts.Node
    required?: boolean
    onlyObjectType?: boolean
    text?: string
}

export default function TypeMenu({
    children,
    factory,
    node,
    parent,
    required,
    onlyObjectType,
    text = '*',
}: Props): ReactElement {
    const [list, setList] = useState<Menu[]>([])
    return (
        <ModalDialog
            onOpen={() =>
                setList(factory(parent, node, required, onlyObjectType).list)
            }
            trigger={children ? children : <Button>{text}</Button>}
        >
            <Menuxx list={list}></Menuxx>
        </ModalDialog>
    )
}

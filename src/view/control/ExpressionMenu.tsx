import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import Menu from '../../model/Menu'
import Button from './Button'
import Menuxx from './Menuxx'
import ModalDialog from './ModalDialog'

interface Factory {
    (
        parent: ts.Node,
        old?: ts.Expression,
        propertyName?: string,
        isLeft?: boolean,
    ): Menu
}

interface Props {
    children?: ReactElement
    factory: Factory
    isLeft?: boolean
    node?: ts.Expression
    parent: ts.Node
    propertyName?: string
    text?: string
}

export default function ExpressionMenu({
    children,
    factory,
    isLeft,
    node,
    parent,
    propertyName,
    text = '*',
}: Props): ReactElement {
    const [list, setList] = useState<Menu[]>([])
    return (
        <ModalDialog
            onOpen={() =>
                setList(factory(parent, node, propertyName, isLeft).list)
            }
            trigger={children ? children : <Button>{text}</Button>}
        >
            <Menuxx list={list}></Menuxx>
        </ModalDialog>
    )
}

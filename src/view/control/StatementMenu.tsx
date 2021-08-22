import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import Menu from '../../model/Menu'
import Button from './Button'
import Menuxx from './Menuxx'
import ModalDialog from './ModalDialog'

interface Factory {
    (parent: ts.Block | ts.SourceFile, node?: ts.Statement): Menu
}

interface Props {
    children?: ReactElement
    factory: Factory
    node?: ts.Statement
    parent: ts.Block | ts.SourceFile
    text?: string
}

export default function StatementMenu({
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

import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import TypeParameterMenuFactory from '../../helper/Menu/TypeParameterMenuFactory'
import Menu from '../../model/Menu'
import Menuxx from '../control/Menuxx'
import ModalDialog from '../control/ModalDialog'
import TextButton from '../control/TextButton'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
import TypeNode from '../type/TypeNode'

interface Props {
    node: ts.TypeParameterDeclaration
}

export default function TypeParameterDeclaration({
    node,
}: Props): ReactElement {
    const [list, setList] = useState<Menu[]>([])
    return (
        <span>
            <IdentifierDeclaration node={node.name}></IdentifierDeclaration>
            <span className="keyword"> extends </span>
            <ModalDialog
                onOpen={() =>
                    setList(
                        TypeParameterMenuFactory(node, node.constraint).list,
                    )
                }
                trigger={
                    node.constraint === undefined ? (
                        <TextButton></TextButton>
                    ) : (
                        <TypeNode node={node.constraint}></TypeNode>
                    )
                }
            >
                <Menuxx list={list}></Menuxx>
            </ModalDialog>
        </span>
    )
}

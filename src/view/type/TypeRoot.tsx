import React, { ReactElement } from 'react'
import ts from 'typescript'
import TypeMenuFactory from '../../helper/Menu/TypeMenuFactory'
import TextButton from '../control/TextButton'
import TypeMenu from '../control/TypeMenu'
import TypeNode from './TypeNode'

interface Props {
    editing?: boolean
    node?: ts.TypeNode
    parent: ts.Node
    required?: boolean
}

export default function TypeRoot({
    editing = false,
    node,
    parent,
    required = false,
}: Props): ReactElement {
    return (
        <TypeMenu
            factory={TypeMenuFactory}
            parent={parent}
            node={node}
            required={required}
        >
            {node === undefined ? (
                editing ? (
                    <TextButton></TextButton>
                ) : (
                    <span></span>
                )
            ) : (
                <TypeNode node={node}></TypeNode>
            )}
        </TypeMenu>
    )
}

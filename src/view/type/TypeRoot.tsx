import React, { ReactElement } from 'react'
import ts from 'typescript'
import TypeMenuFactory, {
    UpdateTypeNode,
} from '../../helper/Menu/TypeMenuFactory'
import MenuButton from '../control/MenuButton'

interface Props {
    children: ReactElement | null
    editing?: boolean
    node: ts.TypeNode | undefined
    updateType: UpdateTypeNode
}

export default function TypeRoot({
    children,
    editing,
    node,
    updateType,
}: Props): ReactElement | null {
    if (node === undefined) {
        return null
    }

    if (!editing) {
        return children
    }

    return (
        <span>
            <MenuButton
                factory={TypeMenuFactory(updateType)}
                visible={true}
            ></MenuButton>

            {children}
        </span>
    )
}

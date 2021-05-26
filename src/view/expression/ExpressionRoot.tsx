import React, { ReactElement } from 'react'
import ts from 'typescript'
import ExpressionMenuFactory from '../../helper/Menu/ExpressionMenuFactory'
import MenuButton from '../control/MenuButton'
import Expression from './Expression'

interface Props {
    editing: boolean
    isLeft?: boolean
    node: ts.Expression | undefined
    parent: ts.Node
    propertyName?: string
}

export default function ExpressionRoot({
    editing,
    isLeft = false,
    node,
    parent,
    propertyName,
}: Props): ReactElement | null {
    if (editing) {
        return (
            <span>
                <MenuButton
                    visible={true}
                    factory={ExpressionMenuFactory(
                        parent,
                        node,
                        propertyName,
                        isLeft,
                    )}
                ></MenuButton>
                {node === undefined ? null : (
                    <Expression editing={true} node={node}></Expression>
                )}
            </span>
        )
    }

    if (node === undefined) {
        return null
    }

    return (
        <span>
            <Expression node={node}></Expression>
        </span>
    )
}

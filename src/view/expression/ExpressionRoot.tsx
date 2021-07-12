import React, { ReactElement } from 'react'
import ts from 'typescript'
import ExpressionMenuFactory from '../../helper/Menu/ExpressionMenuFactory'
import MenuButton from '../control/MenuButton'
import Expression from './Expression'

interface Props {
    isLeft?: boolean
    node: ts.Expression | undefined
    parent: ts.Node
    propertyName?: string
}

export default function ExpressionRoot({
    isLeft = false,
    node,
    parent,
    propertyName,
}: Props): ReactElement | null {
    return (
        <span>
            <MenuButton
                factory={ExpressionMenuFactory(
                    parent,
                    node,
                    propertyName,
                    isLeft,
                )}
                visible={true}
            >
                <span className="cursor-pointer px-2 text-gray-50 hover:text-red-500">
                    *
                </span>
            </MenuButton>

            {node === undefined ? null : <Expression node={node}></Expression>}
        </span>
    )
}

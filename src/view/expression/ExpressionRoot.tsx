import React, { ReactElement } from 'react'
import ts from 'typescript'
import ExpressionMenuFactory from '../../helper/Menu/ExpressionMenuFactory'
import HoverStar from '../control/HoverStar'
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
            >
                <HoverStar></HoverStar>
            </MenuButton>

            {node === undefined ? null : <Expression node={node}></Expression>}
        </span>
    )
}

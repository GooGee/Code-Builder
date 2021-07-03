import React, { ReactElement } from 'react'
import ts from 'typescript'
import ExpressionMenuFactory from '../../helper/Menu/ExpressionMenuFactory'
import EditingView from '../control/EditingView'
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
        <EditingView
            menuFactory={ExpressionMenuFactory(
                parent,
                node,
                propertyName,
                isLeft,
            )}
            viewFactory={(editing) => {
                if (node === undefined) {
                    return null
                }
                return <Expression editing={editing} node={node}></Expression>
            }}
        ></EditingView>
    )
}

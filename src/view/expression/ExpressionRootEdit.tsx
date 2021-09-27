import React, { ReactElement } from 'react'
import ts from 'typescript'
import ExpressionMenuFactory from '../../helper/Menu/ExpressionMenuFactory'
import ExpressionMenu from '../control/ExpressionMenu'
import TextButton from '../control/TextButton'
import Expression from './Expression'

interface Props {
    isLeft?: boolean
    node: ts.Expression | undefined
    parent: ts.Node
    propertyName?: string
}

export default function ExpressionRootEdit({
    isLeft = false,
    node,
    parent,
    propertyName,
}: Props): ReactElement {
    return (
        <span>
            <ExpressionMenu
                factory={ExpressionMenuFactory}
                node={node}
                parent={parent}
                propertyName={propertyName}
                isLeft={isLeft}
            >
                <TextButton></TextButton>
            </ExpressionMenu>

            {node === undefined ? null : (
                <Expression editing={true} node={node} root={node}></Expression>
            )}
        </span>
    )
}

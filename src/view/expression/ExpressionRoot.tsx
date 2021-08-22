import React, { ReactElement, useState } from 'react'
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

export default function ExpressionRoot({
    isLeft = false,
    node,
    parent,
    propertyName,
}: Props): ReactElement | null {
    const [visible, setVisible] = useState(false)
    return (
        <span
            onMouseEnter={(event) => setVisible(true)}
            onMouseLeave={(event) => setVisible(false)}
        >
            {visible === false ? null : (
                <ExpressionMenu
                    factory={ExpressionMenuFactory}
                    node={node}
                    parent={parent}
                    propertyName={propertyName}
                    isLeft={isLeft}
                >
                    <TextButton></TextButton>
                </ExpressionMenu>
            )}

            {node === undefined ? null : (
                <Expression editing={visible} node={node}></Expression>
            )}
        </span>
    )
}

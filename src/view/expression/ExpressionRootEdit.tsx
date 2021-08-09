import React, { ReactElement } from 'react'
import ts from 'typescript'
import ExpressionMenuFactory from '../../helper/Menu/ExpressionMenuFactory'
import MenuModal from '../control/MenuModal'
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
            <MenuModal
                factory={ExpressionMenuFactory(
                    parent,
                    node,
                    propertyName,
                    isLeft,
                )}
            >
                <TextButton></TextButton>
            </MenuModal>

            {node === undefined ? null : (
                <Expression editing={true} node={node}></Expression>
            )}
        </span>
    )
}

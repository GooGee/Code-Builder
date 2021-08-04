import React, { ReactElement, useState } from 'react'
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
    visible?: boolean
}

export default function ExpressionRoot({
    isLeft = false,
    node,
    parent,
    propertyName,
    visible = false,
}: Props): ReactElement | null {
    const [open, setOpen] = useState(false)
    const [block, setVisible] = useState(visible)
    return (
        <span
            onMouseEnter={(event) => setVisible(true)}
            onMouseLeave={(event) => {
                if (open) {
                    return
                }
                if (visible) {
                    return
                }
                setVisible(false)
            }}
        >
            {block === false ? null : (
                <MenuModal
                    factory={ExpressionMenuFactory(
                        parent,
                        node,
                        propertyName,
                        isLeft,
                    )}
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                >
                    <TextButton></TextButton>
                </MenuModal>
            )}

            {node === undefined ? null : <Expression node={node}></Expression>}
        </span>
    )
}

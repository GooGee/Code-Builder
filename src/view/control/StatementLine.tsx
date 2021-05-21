import React, { ReactElement, useState } from 'react'
import Menu from '../../model/Menu'
import MenuButton from './MenuButton'

export interface Hide {
    (): void
}

interface Props {
    children: Array<ReactElement | string>
    editingView?: (hide: Hide) => ReactElement | null
    factory: () => Menu
}

export default function StatementLine({
    children,
    editingView,
    factory,
}: Props): ReactElement {
    const [editing, setEditing] = useState(false)
    const [visible, setVisible] = useState(false)
    return (
        <div
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => (editing ? null : setVisible(false))}
        >
            <MenuButton visible={visible} factory={factory}></MenuButton>
            {editing ? (
                editingView!(() => setEditing(false))
            ) : (
                <span onClick={() => setEditing(true)}>{children}</span>
            )}
        </div>
    )
}

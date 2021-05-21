import React, { ReactElement, useState } from 'react'
import Menu from '../../model/Menu'
import EditingBox from './EditingBox'
import MenuButton from './MenuButton'

export interface Hide {
    (): void
}

interface Props {
    children: any
    editingView?: () => ReactElement | null
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
                <EditingBox hide={() => setEditing(false)}>
                    {editingView!()}
                </EditingBox>
            ) : (
                <span onClick={() => setEditing(true)}>{children}</span>
            )}
        </div>
    )
}

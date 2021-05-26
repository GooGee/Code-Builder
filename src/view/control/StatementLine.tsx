import React, { ReactElement, useState } from 'react'
import Menu from '../../model/Menu'
import EditingBox from './EditingBox'
import MenuButton from './MenuButton'

export interface Hide {
    (): void
}

interface Props {
    children: any
    menuFactory: () => Menu
}

export default function StatementLine({
    children,
    menuFactory,
}: Props): ReactElement {
    const [editing, setEditing] = useState(false)
    const [visible, setVisible] = useState(false)
    return (
        <div
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => (editing ? null : setVisible(false))}
        >
            <MenuButton visible={visible} factory={menuFactory}></MenuButton>
            {editing ? (
                <EditingBox hide={() => setEditing(false)}>
                    {children}
                </EditingBox>
            ) : (
                <span onClick={() => setEditing(true)}>{children}</span>
            )}
        </div>
    )
}

import React, { ReactElement, useState } from 'react'
import Menu from '../../model/Menu'
import EditingBox from './EditingBox'
import MenuButton from './MenuButton'

export interface Hide {
    (): void
}

interface Props {
    menuFactory: () => Menu
    viewFactory: (
        editing: boolean,
        setEditing: React.Dispatch<React.SetStateAction<boolean>>,
    ) => any
}

export default function StatementLine({
    menuFactory,
    viewFactory,
}: Props): ReactElement {
    const [editing, setEditing] = useState(false)
    const [visible, setVisible] = useState(false)
    return (
        <div
            onClick={(event) => event.stopPropagation()}
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => (editing ? null : setVisible(false))}
        >
            <MenuButton visible={visible} factory={menuFactory}></MenuButton>
            {editing ? (
                <EditingBox hide={() => setEditing(false)}>
                    {viewFactory(editing, setEditing)}
                </EditingBox>
            ) : (
                <span onClick={() => setEditing(true)}>
                    {viewFactory(editing, setEditing)}
                </span>
            )}
        </div>
    )
}

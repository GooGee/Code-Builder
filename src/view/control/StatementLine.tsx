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
    return (
        <div className="my-4" onClick={(event) => event.stopPropagation()}>
            <MenuButton visible={editing} factory={menuFactory}></MenuButton>
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

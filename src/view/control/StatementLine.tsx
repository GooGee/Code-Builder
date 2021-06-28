import React, { ReactElement, useState } from 'react'
import Menu from '../../model/Menu'
import Button from './Button'
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
    if (editing) {
        return (
            <div className="my-4" onClick={(event) => event.stopPropagation()}>
                <div>
                    <MenuButton
                        visible={editing}
                        factory={menuFactory}
                    ></MenuButton>
                    <Button onClick={() => setEditing(false)} color="red">
                        <span className="text-red-600">x</span>
                    </Button>
                </div>

                {viewFactory(editing, setEditing)}
            </div>
        )
    }

    return (
        <div
            className="my-4"
            onClick={(event) => {
                event.stopPropagation()
                setEditing(true)
            }}
        >
            {viewFactory(editing, setEditing)}
        </div>
    )
}
